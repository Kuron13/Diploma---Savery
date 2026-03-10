from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Создаёт суперпользователя по умолчанию'

    def handle(self, *args, **options):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@example.com',
                password='admin',
                is_admin=True
            )
            self.stdout.write(
                self.style.SUCCESS('Суперпользователь "admin" успешно создан!')
            )
        else:
            self.stdout.write('Пользователь "admin" уже существует.')
