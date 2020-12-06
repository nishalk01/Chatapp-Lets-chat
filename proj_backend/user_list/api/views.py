from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from accounts.models import Account
from .serializers import UserListSerializers


@permission_classes([AllowAny])
@api_view(['GET',])#ignore user_relation for now
def get_user_list(request):
    print(request)
    users=Account.objects.all()
    serializer=UserListSerializers(users,context={"request":request},many=True)
    return Response(serializer.data)

