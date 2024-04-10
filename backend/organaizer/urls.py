from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrganizatorViewSet

app_name = 'organaizer'

router_v1 = DefaultRouter()
router_v1.register(
    r'organaizer',
    OrganizatorViewSet,
    basename='organaizer'
    )

urlpatterns = [
    path('', include(router_v1.urls)),
]
