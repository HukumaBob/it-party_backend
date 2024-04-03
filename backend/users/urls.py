from django.urls import include, path
from rest_framework import routers
from .views import activate_account, home

# from .views import ProfileViewSet

app_name = 'users'

router_v1 = routers.DefaultRouter()

# router_v1.register('profile', ProfileViewSet, basename='profile')

urlpatterns = [
    path('home/', home, name='home'),
    path('', include(router_v1.urls)),
    path('activate/<uidb64>/<token>/', activate_account, name='activate'),
]
