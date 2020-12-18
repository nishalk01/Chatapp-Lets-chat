from django.db import models
from  accounts.models import Account

# Create your models here.
class Messages(models.Model):
    from_user=models.ForeignKey(Account,on_delete=models.CASCADE,related_name="from_user")
    message=models.TextField()
    message_sent_time=models.DateTimeField(auto_now=True)
    room_id=models.ForeignKey(Account,to_field='user_room_id',on_delete=models.CASCADE) #to_user
    
