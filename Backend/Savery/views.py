from django.shortcuts import render
from django.http import HttpResponse, HttpRequest

# Create your views here.
def hello_view1(request: HttpRequest) -> HttpResponse:
    return HttpResponse('Hello, world')

def hello_view(request):
    return HttpResponse('Hello, world')

def hello_view3(request):
    context = {
        'test': 5,
    }
    return render(request, 'SaveryView.html', context)


from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import CustomUserCreationForm

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')  # Перенаправление после успешной регистрации
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/register.html', {'form': form})