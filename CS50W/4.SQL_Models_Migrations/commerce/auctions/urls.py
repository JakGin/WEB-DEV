from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("add", views.add, name="add"),
    path("categories", views.categories, name="categories"),
    path("messages", views.messages, name="messages"),
    path("categories/<str:category>", views.category, name="category"),
    path("listing/<int:id>", views.listing, name="listing"),
    path("add_to_watchlist/<int:listing_id>", views.add_to_watchlist, name="add_to_watchlist"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("remove_from_watchlist/<int:listing_id>", views.remove_from_watchlist, name="remove_from_watchlist"),
    path("remove_from_watchlist_listing/<int:listing_id>", views.remove_from_watchlist_listing, name="remove_from_watchlist_listing"),
    path("close_listing/<int:listing_id>", views.close_listing, name="close_listing"),
    path("add_comment/<int:listing_id>", views.add_comment, name="add_comment"),
    path("your_listings", views.your_listings, name="your_listings")
]
