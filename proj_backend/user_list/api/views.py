from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
import jwt
from django.conf import settings

from accounts.models import Account
from user_list.models import UserRelation
from .serializers import UserListSerializers,UserDetailsSerializers




def get_user_from_token(request):
 try:
    tokens_jwt=request.META["HTTP_AUTHORIZATION"]
    _,token=tokens_jwt.split(" ")#add try and except
    payload=jwt.decode(token,settings.SECRET_KEY)
    usr_id=payload['user_id']
    return True,usr_id
 except:
    return False,""


@api_view(['GET',])
def get_current_user_details(request):
    #room_id,avatar,username,status,email
   satisfied,user_id=get_user_from_token(request)
   if(satisfied):
    account_obj=Account.objects.get(id=user_id)
    serializer=UserDetailsSerializers(account_obj,context={"request":request})
    return Response(serializer.data)
   else:
       return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST',])
def update_profile(request):
    if request.method=="POST":
        satisfied,user_id=get_user_from_token(request)
        if(satisfied):
          account_obj=Account.objects.get(id=user_id)
          account_obj.avatar=request.FILES['image'] #change avatar
          account_obj.save()
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(status=status.HTTP_200_OK)
            

@api_view(['GET'])
def remove_profile(request):
    if request.method=="GET":
         satisfied,user_id=get_user_from_token(request)
         if(satisfied):
             account_obj=Account.objects.get(id=user_id)
             account_obj.avatar.delete()
         else:
             return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(status=status.HTTP_200_OK)
    
    
@api_view(['GET',])
def get_user_room_id(request):
    if request.method=="GET":
        satisfied,user_id=get_user_from_token(request)
        if(satisfied):
            account_obj=Account.objects.get(id=user_id)  
            return Response({"room_id":account_obj.user_room_id})
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_user_list_relation(request):
    if request.method=="GET":
        satisfied,user_id=get_user_from_token(request)
        if(satisfied): 
            userDetail=[]
            UserRelation_obj=UserRelation.objects.get(current_user=user_id)
            friends=UserRelation_obj.users.all()#list of users added
            for friend in friends:
             serializers=UserListSerializers(friend,context={"request":request})
             userDetail.append(serializers.data)
            return Response(data=userDetail,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])            
def change_status(request):
    if request.method=="POST":
        data=request.data
        satisfied,user_id=get_user_from_token(request)
        if(satisfied): 
            account_obj=Account.objects.get(id=user_id)
            account_obj.status=data['status']
            account_obj.save()
            status_profile={"status":account_obj.status}
            return Response(status_profile,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)



