import math
import os

from django.db import models
from django.contrib.auth.models import AbstractUser

# class User(models.Model):
class User(AbstractUser):
    # username = models.CharField(max_length=100, verbose_name='Имя пользователя', help_text='Имя ползоваеля (максимум 100 символов)')
    # email = models.EmailField(max_length=100, verbose_name='Email пользователя', help_text='Электронная почта пользователя')
    # password = models.CharField(max_length=20, verbose_name='Пароль пользователя', help_text='Пароль пользователя')
    full_name = models.CharField(max_length=255, blank=True, verbose_name='Полное имя', help_text='Полное имя пользователя (ФИО)')
    is_admin = models.BooleanField(default=False, verbose_name='Признак администратора', help_text='Отмечает пользователя как администратора')
    storage_path = models.CharField(max_length=500, blank=True, verbose_name='Путь к хранилищу пользователя', help_text='Относительный путь к персональному хранилищу пользователя')

    # REQUIRED_FIELDS = ['username', 'email', 'password']
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        db_table = 'custom_user'

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.storage_path:
            self.storage_path = f'uploads/users/{self.username}/'
        super().save(*args, **kwargs)

    def get_storage_path(self):
        """Возвращает полный путь к хранилищу пользователя"""
        from django.conf import settings
        return os.path.join(settings.MEDIA_ROOT, self.storage_path.strip('/'))

class File(models.Model):
    name = models.CharField(max_length=255, verbose_name='Имя файла', help_text='Название файла (максимум 255 символов)')
    comment = models.TextField(blank=True, null=True, verbose_name='Комментарий', help_text='Описание или комментарий к файлу')
    file = models.FileField(upload_to='uploads/', verbose_name='Файл', help_text='Загружаемый файл')
    size = models.BigIntegerField(verbose_name='Размер файла (в байтах)', help_text='Размер файла в байтах')
    uploader = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Загрузивший пользователь', help_text='Пользователь, загрузивший файл')
    date_created = models.DateTimeField(auto_now_add=True, verbose_name='Дата загрузки', help_text='Дата и время загрузки файла')
    date_last_downloaded = models.DateTimeField(null=True, blank=True, verbose_name='Дата последнего скачивания', help_text='Дата и время последнего скачивания файла')

    class Meta:
        verbose_name = 'Файл'
        verbose_name_plural = 'Файлы'
        ordering = ['-date_created']

    def __str__(self):
        return self.name

    def get_size_display(self):
        """Возвращает размер файла в удобочитаемом формате (КБ, МБ, ГБ)"""
        size_bytes = self.size
        if size_bytes == 0:
            return '0 Б'
        size_names = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ']
        i = int(math.floor(math.log(size_bytes, 1024)))
        p = math.pow(1024, i)
        s = round(size_bytes / p, 2)
        return f'{s} {size_names[i]}'

    def save(self, *args, **kwargs):
        if self.file and not self.size:
            self.size = self.file.size
        super().save(*args, **kwargs)



# from django.db import models
# from django.contrib.auth.models import AbstractUser
# import os
#
# class User(AbstractUser):
#     full_name = models.CharField(
#         max_length=255,
#         verbose_name='Полное имя',
#         blank=True,
#         help_text='Полное имя пользователя (ФИО)'
#     )