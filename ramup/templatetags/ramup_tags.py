from django import template

from ramup.models import Document, RadioStationsByCity, Town

register = template.Library()


@register.inclusion_tag('ramup/uploaded_files.html')
def list_files():
     files = Document.objects.all()
     return {"title": 'uploaded files', "files": files}


@register.inclusion_tag('ramup/tags/choice_town.html')
def choice_town():
     towns = Town.objects.all()
     return {"title": 'Выбор города', "towns": towns}

@register.inclusion_tag('ramup/tags/choice_stantion.html')
def choice_station(city=None):
     if not city:
          radio_stations = RadioStationsByCity.objects.all()
     else:
          print(city)
          radio_stations = RadioStationsByCity.objects.filter(name_city=city)
     return {"title": f'Выбор радиостанции в городе {city}', "radio_stations": radio_stations}



# @register.simple_tag(name='getcats')
# def get_categories(filter=None):
#     if not filter:
#         return Category.objects.all()
#     else:
#         return Category.objects.filter(pk=filter)

# @register.inclusion_tag('women/list_categories.html')

# def show_categories(sort=None, cat_selected=0):
#     if not sort:
#         cats = Category.objects.all()
#     else:
#         cats = Category.objects.order_by(sort)

#     return {"cats": cats, "cat_selected": cat_selected}
