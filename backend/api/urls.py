from django.urls import path

from .views import guitar_detail, guitar_list, health

urlpatterns = [
    path("health/", health, name="health"),
    path("guitars/", guitar_list, name="guitars"),
    path("guitars/<int:pk>/", guitar_detail, name="guitar_detail"),
]
