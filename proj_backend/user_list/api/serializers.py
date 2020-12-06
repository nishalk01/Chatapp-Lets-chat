from rest_framework import serializers

from accounts.models import Account

class UserListSerializers(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=['id','username','avatar','user_room_id']