from django import template

from ramup.models import Document

register = template.Library()


@register.inclusion_tag('ramup/uploaded_files.html')
def list_files():
     files = Document.objects.all()
     return {"title": 'uploaded files', "files": files}



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
