from django.db import models
from accounts.models import Account
# Create your models here.
class UserRelation(models.Model):
    current_user=models.ForeignKey(Account,on_delete=models.CASCADE,related_name="current_user")
    users=models.ManyToManyField(Account,related_name="friends")

    @property
    def friend_count(self):
        return self.users.count()

    def __str__(self):
        return str(self.current_user)