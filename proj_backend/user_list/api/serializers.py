from rest_framework import serializers

from accounts.models import Account

class UserListSerializers(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=['id','username','avatar','user_room_id']


class UserDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=['id','username','email','avatar','status','user_room_id']