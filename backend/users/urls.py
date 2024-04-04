from django.urls import include, path
from rest_framework import routers
from .views import ActivateAccountView, UserProfileViewSet

# from .views import ProfileViewSet

app_name = 'users'

router_v1 = routers.DefaultRouter()

router_v1.register('userprofiles', UserProfileViewSet, basename='profile')

urlpatterns = [
    path('', include(router_v1.urls)),
    path(
        'activate/<uidb64>/<token>/',
        ActivateAccountView.as_view(),
        name='activate'
        ),
]
