from django.contrib.auth.models import User, Group
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
            'document': forms.FileInput(attrs={'class': "form-control", 'type': "file"}),
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


class SchedulerRequest(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'username', 'last_name']
    date = forms.DateInput()
    operators = forms.ModelMultipleChoiceField(
        queryset=User.objects.values('first_name').filter(
            groups__name='Operators'),
        widget=forms.CheckboxSelectMultiple
    )
    f = forms.ComboField(fields=[forms.ModelMultipleChoiceField(
        queryset=User.objects.values('first_name').filter(
            groups__name='Operators'),
        widget=forms.CheckboxSelectMultiple
    ), forms.EmailField()])
