from django.contrib import admin

# Register your models here.

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from .models import File

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'full_name', 'email', 'is_admin', 'storage_path', 'date_joined')
    list_filter = ('is_admin', 'is_staff', 'is_active', 'date_joined')
    search_fields = ('username', 'full_name', 'email')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Личная информация', {'fields': ('full_name', 'email')}),
        ('Права доступа', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_admin', 'groups', 'user_permissions')}),
        ('Даты', {'fields': ('last_login', 'date_joined')}),
        ('Хранилище', {'fields': ('storage_path',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'full_name', 'email', 'password1', 'password2', 'is_admin'),
        }),
    )

@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('name', 'uploader', 'get_size_display', 'date_created', 'date_last_downloaded')
    list_filter = ('date_created', 'uploader')
    search_fields = ('name', 'comment')
    readonly_fields = ('size', 'date_created')

    def get_size_display(self, obj):
        return obj.get_size_display()
    get_size_display.short_description = 'Размер'