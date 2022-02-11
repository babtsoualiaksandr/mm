import os
from django.db import models
from django.shortcuts import get_object_or_404
from django.urls import reverse

from core import settings
from django.core.validators import RegexValidator


class Document(models.Model):
    description = models.CharField(max_length=255, blank=False)
    document = models.FileField(upload_to='documents/%Y/%m/%d/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def delete(self, *args, **kwargs):
        super(Document,self).delete(*args,**kwargs)
    def __str__(self) -> str:
        return f'{self.description} {self.document}' 

class Town(models.Model):
    name = models.CharField(max_length=255, blank=True, verbose_name="Название города" )
    def __str__(self) -> str:
        return self.name


GENDER_MALE = 0
GENDER_FEMALE = 1
GENDER_CHOICES = [(GENDER_MALE, 'Male'), (GENDER_FEMALE, 'Female')]

class Age(models.Model):
    group = models.CharField(max_length=5, blank=True,  verbose_name="Группа возраста")

    def __str__(self) -> str:
        return self.group


class Telephone(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=13, blank=True)
    town = models.ForeignKey(Town, related_name='telephones', on_delete=models.CASCADE,verbose_name="Город")
    gender = models.IntegerField(choices=GENDER_CHOICES)
    age = models.ForeignKey(Age, related_name='telephones',on_delete=models.CASCADE, verbose_name="Возраст")

    def __str__(self) -> str:
        return f'{self.phone_number} {self.town} {self.gender} {self.age}'
    

class Respondent(models.Model):
    telephone = models.ForeignKey(Telephone, related_name='Respondents', on_delete=models.CASCADE, verbose_name="Телефон")
    forename = models.CharField(max_length=5, blank=True)
    def __str__(self) -> str:
        return f'{self.forename} {self.telephone} '


class Answer(models.Model):
    сontent_answer = models.TextField(verbose_name="Содержание ответа")
    prompt = models.TextField(verbose_name="Подсказка")
    action = models.CharField(max_length=50, blank=True, verbose_name="Дейсвие")
    jump = models.CharField(max_length=5, blank=True, verbose_name="Номер следующего вопроса или пусто ()")

    def __str__(self) -> str:
        return f'{self.сontent_answer} переход {self.jump} '
    def get_absolute_url(self):
        return reverse('answer', args=[str(self.id)])

class Question(models.Model):
    number = models.CharField(max_length=5, blank=True, verbose_name="Номер вопроса (1; 9.1)")
    сontent_question = models.TextField(verbose_name="Содержание вопроса")
    prompt = models.TextField(verbose_name="Подсказка")
    answers = models.ManyToManyField(Answer,related_name='questions', blank=True, verbose_name='Варианты ответов')
 
    def __str__(self) -> str:
        return f'{self.number}  {self.сontent_question}'



