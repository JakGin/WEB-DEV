from django.contrib import admin

from .models import User, Listing, Bid, Comment, Watchlist


class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email")

class ListingAdmin(admin.ModelAdmin):
    list_display = ("title", "datetime", "user", "is_closed")

class BidAdmin(admin.ModelAdmin):
    list_display = ("listing", "price", "user", "datetime")

class CommentAdmin(admin.ModelAdmin):
    list_display = ("listing", "datetime", "user")

class WatchlistAdmin(admin.ModelAdmin):
    list_display = ("user", "listing")


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Listing, ListingAdmin)
admin.site.register(Bid, BidAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Watchlist, WatchlistAdmin)
