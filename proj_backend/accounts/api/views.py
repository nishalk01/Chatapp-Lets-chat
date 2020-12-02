from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.conf import settings
from rest_framework import status,generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from uuid import uuid4
from accounts.api.serializers import RegistrationSerializer
from accounts.models import Account



def send_email(email_data):
    email=EmailMessage(subject=email_data['email_subject'],body=email_data['email_body'],to=[email_data['to_email']])
    email.send()

@api_view(['POST',])
def registration_view(request):
    if request.method=="POST":
        serializer=RegistrationSerializer(data=request.data)
        data={}
        if serializer.is_valid():
            account=serializer.save()
            user=Account.objects.get(email=account.email)
            token=RefreshToken.for_user(user)
            current_site=get_current_site(request).domain
            relativeLink=reverse('email-verify')
            absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
     
            email_body = 'Hi '+user.username + \
            ' Use the link below to verify your email \n' + absurl

            email_data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}

            send_email(email_data)

            data['response']=int(200)
            data['email']=account.email
            data['username']=account.username
        else:
            data=serializer.errors
        return Response(data)

class VerifyEmail(generics.GenericAPIView):
    def get(self,request):
        token=request.GET.get('token')
        try:
            payload=jwt.decode(token,settings.SECRET_KEY)
            user=Account.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified=True
                user_uuid=str(uuid4())
                user_uuid=user_uuid.replace("-","")
                user.user_room_id=user_uuid
                user.save()
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        