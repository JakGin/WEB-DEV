from django.db import models

# Create your models here.
class Airport(models.Model):
    code = models.CharField(max_length=3)
    city = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.city} ({self.code})"


class Flight(models.Model):
    origin = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="departures")
    destination = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="arrivals")
    duration = models.IntegerField()

    def __str__(self):
        return f"{self.id}: {self.origin} to {self.destination}"


class Passenger(models.Model):
    first = models.CharField(max_length=64)
    last = models.CharField(max_length=64)
    flights = models.ManyToManyField(Flight, blank=True, related_name="passengers")

    def __str__(self):
        return f"{self.first} {self.last}"
        

"""
from flights.models import *
>>> jfk = Airport(code="JFK", city="New York")
>>> jfk.save()
>>> lhr = Airport(code="LHR", city="London")
>>> lhr.save()
>>> cdg = Airport(code="CDG", city="Paris")
>>> cdg.save()
>>> nrt = Airport(code="NRT", city="Tokyo")
>>> nrt.save()
>>> f = Flight(origin=jfk, destination=lhr, duration=415)
>>> f.save()
>>> f
<Flight: 1: New York (JFK) to London (LHR)>
>>> f.origin
<Airport: New York (JFK)>
>>> f.origin.city
'New York'
>>> f.origin.code
>>> lhr.arrivals.all()
<QuerySet [<Flight: 1: New York (JFK) to London (LHR)>]>
'JFK'


>>> Airport.objects.get(code="JFK")
<Airport: New York (JFK)>
>>> Airport.objects.filter(city="New York").first()
<Airport: New York (JFK)>
>>> jfk = Airport.objects.get(city="New York")
>>> cdg = Airport.objects.get(city="Paris")
>>> cdg
<Airport: Paris (CDG)>
f = Flight(origin=jfk, destination=cdg, duration=435)
f.save()

"""