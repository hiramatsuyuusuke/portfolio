from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime

# Create your views here.

def index(request):

    html = "<h1>myappのウェルカムページです</h1>"

    return HttpResponse(html)


def foo(request):
    html = "<h1>fooが指定された時のページです</h1>"
    return HttpResponse(html)

#def hello(request):
#   return render(request, 'index.html')

def hello(request):
    context = {
        'datetime': datetime.now(),
        'message': 'Templateを使ってみよう!',
    }
    return render(request, 'index.html', context)
