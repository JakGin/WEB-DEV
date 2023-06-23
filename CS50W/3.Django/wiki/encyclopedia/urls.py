from django.urls import path

from . import views

app_name = "encyclopedia"

urlpatterns = [
    path("", views.index, name="index"),
    path("random", views.random_entry, name="random"),
    path("search", views.search, name="search"),
    path("add", views.add_entry, name="add_entry"),
    path("edit/<str:title>", views.edit_entry, name="edit_entry"),
    path("<str:entry>", views.entry, name="entry"),
]
