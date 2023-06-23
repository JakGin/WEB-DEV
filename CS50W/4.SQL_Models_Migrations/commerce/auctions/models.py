from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Listing(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField(max_length=4096)
    starting_bid = models.FloatField(null=True)
    image_url = models.CharField(max_length=4096, null=True)
    category = models.CharField(max_length=64,)
    datetime = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_closed = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.title


class Bid(models.Model):
    price = models.FloatField()
    datetime = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    winner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="winner")


class Comment(models.Model):
    datetime = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=2048)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
