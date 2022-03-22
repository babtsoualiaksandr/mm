from .paginators import CustomPaginator
from django.contrib import admin
from .models import *


class BenchmarkCityAgeAdmin(admin.ModelAdmin):
    list_display = ('id', 'city', 'age', 'population')
    # list_display_links = ('id')
    search_fields = ('city', 'age')
    list_filter = ('city', 'age')
    list_editable = ('city', "age", 'population')


class BenchmarkCityGenderAdmin(admin.ModelAdmin):
    list_display = ('id', 'city', 'gender', 'population')
    search_fields = ('city', 'gender')
    list_filter = ('city', 'gender')
    list_editable = ('city', "gender", 'population')


class BenchmarkAgeGenderAdmin(admin.ModelAdmin):
    list_display = ('id', 'age', 'gender', 'population')
    search_fields = ('age', 'gender')
    list_filter = ('age', 'gender')
    list_editable = ('age', "gender", 'population')


class BenchmarkCityGenderAgeAdmin(admin.ModelAdmin):
    list_display = ('id', 'city', 'age', 'population_M_rate',
                    'population_F_rate', 'population_M', 'population_F')
    list_filter = ('city', 'age')
    search_fields = ('city', 'age')
    list_editable = ('city', "age", 'population_M_rate', 'population_F_rate')
    save_on_top = True



class TelephoneAdmin(admin.ModelAdmin):
    show_full_result_count = False
    paginator = CustomPaginator


# admin.site.register(Document)
# admin.site.register(Answer)
# admin.site.register(Question)
admin.site.register(Town)
# admin.site.register(Respondent)
admin.site.register(Age)
admin.site.register(Telephone, TelephoneAdmin)
admin.site.register(RadioStation)
admin.site.register(RadioStationsByCity)
admin.site.register(BenchmarkAgeGender, BenchmarkAgeGenderAdmin)
admin.site.register(BenchmarkCityAge, BenchmarkCityAgeAdmin)
admin.site.register(BenchmarkCityGender, BenchmarkCityGenderAdmin)
admin.site.register(BenchmarkCityGenderAge, BenchmarkCityGenderAgeAdmin)
admin.site.register(QuotaMonth)
admin.site.site_header = 'Администрирование RAMUP'
