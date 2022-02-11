from django import forms
from django.utils.translation import gettext_lazy as _

from ramup.models import Document

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()


class DocumentForm(forms.ModelForm):
    class Meta:
        model = Document
        fields = ('description', 'document',)
        widgets = {
            'description': forms.TextInput(attrs={'class': 'form-control'}),
            'document': forms.FileInput(attrs={'class':"form-control", 'type':"file"}),
        }
        labels = {
            'document': _('Файл'),
            'description': _('Описание'),

        }
        help_texts = {
            'document': _('Выбрать файл для загрузки.'),
        }
        error_messages = {
            'description': {
                'max_length': _("This writer's name is too long."),
            },
        }
