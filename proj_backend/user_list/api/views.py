from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
import jwt
from PIL import Image
import io
import base64
# from PIL import Image
from accounts.models import Account
from django.conf import settings
from .serializers import UserListSerializers,UserDetailsSerializers




def get_user_from_token(tokens_jwt):
 try:
    _,token=tokens_jwt.split(" ")#add try and except
    payload=jwt.decode(token,settings.SECRET_KEY)
    usr_id=payload['user_id']
    return True,usr_id
 except:
    return False,""

@permission_classes([AllowAny])
@api_view(['GET',])#ignore user_relation for now
def get_user_list(request):
    print(request)
    users=Account.objects.all()
    serializer=UserListSerializers(users,context={"request":request},many=True)
    return Response(serializer.data)

@api_view(['GET',])
def get_current_user_details(request):
    #room_id,avatar,username,status,email
   tokens_jwt=request.META["HTTP_AUTHORIZATION"]
   print(tokens_jwt)
   satisfied,user_id=get_user_from_token(tokens_jwt)
   if(satisfied):
    account_obj=Account.objects.get(id=user_id)
    serializer=UserDetailsSerializers(account_obj,context={"request":request})
    # response_room_id={"roomid":account_obj.user_room_id,"email":account_obj.email,"username":account_obj.username,}
    return Response(serializer.data)
   else:
       return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST',])
def update_profile(request):
    if request.method=="POST":
        tokens_jwt=request.META["HTTP_AUTHORIZATION"]
        satisfied,user_id=get_user_from_token(tokens_jwt)
        if(satisfied):
          account_obj=Account.objects.get(id=user_id)
          account_obj.avatar=request.FILES['image'] #change avatar
          account_obj.save()
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(status=status.HTTP_200_OK)
            
        
    

   


