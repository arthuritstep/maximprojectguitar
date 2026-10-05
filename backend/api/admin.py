from django.contrib import admin

from .models import Guitar


@admin.register(Guitar)
class GuitarAdmin(admin.ModelAdmin):
    list_display = ("brand", "name", "price", "stock")
    search_fields = ("brand", "name")
