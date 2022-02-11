from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect, render
from django.http.response import JsonResponse
from django.urls import reverse, reverse_lazy
from django.views.generic.edit import DeleteView

from ramup.models import Document
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.mixins import PermissionRequiredMixin


from .forms import DocumentForm

# Create your views here.
def home(request):
    return render(request, 'ramup/home.html', {
        'title': 'home' 
    })

@login_required
@permission_required('ramup.view_document', raise_exception=True)
def upload_file(request):
    print(request)
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()  
            return redirect('/ramup/upload_file/')
    else:
        form = DocumentForm() 
    return render(request, 'ramup/upload_file.html', {
        'form': form       
    }) 

class DocumentDeleteView(PermissionRequiredMixin,DeleteView):
    model = Document
    success_url =reverse_lazy("upload_file")
    permission_required = ('ramup.view_document', 'ramup.change_document', 'ramup.delete_document')
 