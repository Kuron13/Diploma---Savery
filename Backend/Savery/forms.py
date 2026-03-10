from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    full_name = forms.CharField(
        max_length=255,
        required=False,
        widget=forms.TextInput(attrs={'class': 'input'})
    )
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': 'input'})
    )
    is_admin = forms.BooleanField(
        required=False,
        label='Администратор'
    )

    class Meta:
        model = User
        fields = ('username', 'full_name', 'email', 'password1', 'password2', 'is_admin')

    def clean_username(self):
        username = self.cleaned_data.get('username')
        # Дополнительная проверка формата логина (если нужна на бэкенде)
        import re
        if not re.match(r'^[A-Za-z][A-Za-z\d]{3,19}$', username):
            raise forms.ValidationError('Логин должен начинаться с буквы и содержать только латинские буквы и цифры (4–20 символов).')
        return username