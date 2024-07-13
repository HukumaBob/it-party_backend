from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

app_name = 'mvt_admin'

urlpatterns = [
    path('mvt_admin/', views.event_list, name='event_list'),
    path('mvt_admin/<int:event_id>/', views.event_create, name='event_detail'),
    path('mvt_admin/create/', views.event_create, name='event_create'),
    path('mvt_admin/speakers/', views.speaker_list, name='speaker_list'),
    path('mvt_admin/speakers/<int:pk>/', views.speaker_detail, name='speaker_detail'),
    path('mvt_admin/speakers/create/', views.speaker_create, name='speaker_create'),
    path('mvt_admin/speakers/<int:pk>/update/', views.speaker_update, name='speaker_update'),
    path('mvt_admin/speakers/<int:pk>/delete/', views.speaker_delete, name='speaker_delete'),    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
