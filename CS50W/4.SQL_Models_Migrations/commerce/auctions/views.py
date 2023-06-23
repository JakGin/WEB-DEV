from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required

from .models import User, Listing, Bid, Comment, Watchlist


def index(request):
    listings = Listing.objects.all()
    listings = [(listing, Bid.objects.get(listing=listing).price) for listing in listings]

    if request.user.is_authenticated:
        
        return render(request, "auctions/index.html", {
        "listings": listings,
        "in_watchlist": True
        })

    return render(request, "auctions/index.html", {
        "listings": listings,
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


def add(request):
    if request.method == "POST" and request.user.is_authenticated:
        title = request.POST["title"]
        description = request.POST["description"]
        starting_bid = request.POST["starting_bid"]
        category = request.POST["category"]
        image_url = request.POST["image_url"]
        user = request.user

        listing = Listing(
            title=title, description=description, starting_bid=starting_bid, image_url=image_url, category=category, user=user
        )
        listing.save()
        Bid(price=starting_bid, user=request.user, listing=listing).save()

        return HttpResponseRedirect(reverse("index"))

    if request.user.is_authenticated:
        return render(request, "auctions/add.html")

    return HttpResponseRedirect(reverse("login"))


def listing(request, id):
    listing = Listing.objects.get(pk=id)
    comments = Comment.objects.filter(listing=listing)

    if request.method == "POST":
        bid = float(request.POST["bid"])
        latest_bid = Bid.objects.get(listing=listing)

        if latest_bid.user == listing.user:
            if bid >= latest_bid.price:
                new_bid = Bid(user=request.user, price=bid, listing=listing)
                latest_bid.delete()
                new_bid.save()
                return HttpResponseRedirect(reverse("listing", args=(listing.id,)))
            else:
                if Watchlist.objects.filter(user = request.user, listing=listing):
                    return render(request, "auctions/listing.html", {
                    "listing": listing,
                    "add_to_watchlist": False,
                    "current_bid_price": Bid.objects.get(listing=listing).price,
                    "potential_winner": Bid.objects.get(listing=listing).user,
                    "comments": comments,
                    "error_message": "Bid has to be bigger or equal to current bid"
                    })
                else:
                    return render(request, "auctions/listing.html", {
                        "listing": listing,
                        "add_to_watchlist": True,
                        "current_bid_price": Bid.objects.get(listing=listing).price,
                        "potential_winner": Bid.objects.get(listing=listing).user,
                        "comments": comments,
                        "error_message": "Bid has to be bigger or equal to current bid"
                    })
        else:
            if bid > latest_bid.price:
                new_bid = Bid(user=request.user, price=bid, listing=listing)
                latest_bid.delete()
                new_bid.save()
                return HttpResponseRedirect(reverse("listing", args=(listing.id,)))
            else:
                if Watchlist.objects.filter(user = request.user, listing=listing):
                    return render(request, "auctions/listing.html", {
                    "listing": listing,
                    "add_to_watchlist": False,
                    "current_bid_price": Bid.objects.get(listing=listing).price,
                    "potential_winner": Bid.objects.get(listing=listing).user,
                    "comments": comments,
                    "error_message": "Bid has to be bigger than current bid"
                    })
                else:
                    return render(request, "auctions/listing.html", {
                        "listing": listing,
                        "add_to_watchlist": True,
                        "current_bid_price": Bid.objects.get(listing=listing).price,
                        "potential_winner": Bid.objects.get(listing=listing).user,
                        "comments": comments,
                        "error_message": "Bid has to be bigger than current bid"
                    })

    else:
        if request.user.is_authenticated:
            if Watchlist.objects.filter(user = request.user, listing=listing):
                return render(request, "auctions/listing.html", {
                "listing": listing,
                "current_bid_price": Bid.objects.get(listing=listing).price,
                "potential_winner": Bid.objects.get(listing=listing).user,
                "comments": comments,
                "add_to_watchlist": False
                })

            return render(request, "auctions/listing.html", {
                "listing": listing,
                "current_bid_price": Bid.objects.get(listing=listing).price,
                "potential_winner": Bid.objects.get(listing=listing).user,
                "comments": comments,
                "add_to_watchlist": True
            })

        return render(request, "auctions/listing.html", {
            "current_bid_price": Bid.objects.get(listing=listing).price,
            "potential_winner": Bid.objects.get(listing=listing).user,
            "comments": comments,
            "listing": listing
        })


def categories(request):
    categories = []
    for listing in Listing.objects.filter(is_closed=False):
        if listing.category not in categories:
            categories.append(listing.category)
    return render(request, "auctions/categories.html", {
        "categories": categories
    })


def category(request, category):
    return render(request, "auctions/category.html", {
        "listings": Listing.objects.filter(category=category),
        "category": category
    })


@login_required
def add_to_watchlist(request, listing_id):
    user = request.user
    listing = Listing.objects.get(pk=listing_id)
    watchlist = Watchlist.objects.all()

    flag = True
    for record in watchlist:
        if record.user == user and record.listing == listing:
            flag = False

    if flag:
        watchlist = Watchlist(user=user, listing=listing)
        watchlist.save()

    return HttpResponseRedirect(reverse("listing", args=(listing_id,)))


@login_required
def watchlist(request):
    users_watchlist = Watchlist.objects.filter(user=request.user)
    listings = Listing.objects.filter(pk__in=[record.listing.id for record in users_watchlist])
    listings = [(listing, Bid.objects.get(listing=listing).price) for listing in listings]

    return render(request, "auctions/watchlist.html", {
        "listings_in_watchlist": listings
    })


@login_required
def remove_from_watchlist(request, listing_id):
    user = request.user
    listing = Listing.objects.get(pk=listing_id)
    Watchlist.objects.filter(user=user, listing=listing).delete()

    return HttpResponseRedirect(reverse("watchlist"))


@login_required
def remove_from_watchlist_listing(request, listing_id):
    user = request.user
    listing = Listing.objects.get(pk=listing_id)
    Watchlist.objects.filter(user=user, listing=listing).delete()

    return HttpResponseRedirect(reverse("listing", args=(listing_id,)))


@login_required
def close_listing(request, listing_id):
    listing = Listing.objects.get(pk=listing_id)
    winner = Bid.objects.get(listing=listing).user
    bid = Bid.objects.get(listing=listing)
    bid.winner = winner
    bid.save()
    listing.is_closed = True
    listing.save()
    
    return HttpResponseRedirect(reverse("index"))


@login_required
def messages(request):
    won_bids = Bid.objects.filter(winner=request.user)
    won_listings = []
    for won_bid in won_bids:
        won_listings.append(won_bid.listing)
    won_listings = [(listing, Bid.objects.get(listing=listing).price) for listing in won_listings]
    return render(request, "auctions/messages.html", {
        "won_listings": won_listings
    })


@login_required
def add_comment(request, listing_id):
    if request.method == "POST":
        content = request.POST["comment"]
        listing = Listing.objects.get(pk=listing_id)
        new_comment = Comment(content=content, user=request.user, listing=listing)
        new_comment.save()
        return HttpResponseRedirect(reverse("listing", args=(listing_id,)))


@login_required
def your_listings(request):
    listings = Listing.objects.filter(user=request.user)
    listings = [(listing, Bid.objects.get(listing=listing).price) for listing in listings]

    return render(request, "auctions/your_listings.html", {
        "listings": listings
    })
    