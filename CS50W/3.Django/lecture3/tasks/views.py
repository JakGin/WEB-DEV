from django.shortcuts import render
from django import forms
from django.http import HttpResponseRedirect
from django.urls import reverse

## tasks = []

class NewTaskForm(forms.Form):
    task = forms.CharField(label="New Task")
    priority = forms.IntegerField(label="Priority", min_value=1, max_value=10)

# Create your views here.
def index(request):
    # Creating tasks list in the session dictionary if not already in the user session
    if "tasks" not in request.session:
        request.session["tasks"] = []
    return render(request, "tasks/index.html", {
        "tasks": request.session["tasks"]
    })

def add(request):
    # Creating tasks list in the session dictionary if not already in the user session
    # It is needed when sb don't visit the index page at the first place but the 'add' route
    if "tasks" not in request.session:
        request.session["tasks"] = []

    if request.method == "POST":
        # Creating new form out of data stored in request.POST (what user sent)
        form = NewTaskForm(request.POST)
        if form.is_valid():
            # Get the data from user input
            task = form.cleaned_data["task"]
            #we need to use += syntax, append() doesn't work!
            request.session["tasks"] += [task]
            ## tasks.append(task)
            # Automatically redirect user to the index.html page
            return HttpResponseRedirect(reverse("tasks:index"))
        # If form is not valid, send form validated by server (with hints what is wrong)
        else:
            return render(request, "tasks/add.html", {
                "form": form
            })

    return render(request, "tasks/add.html", {
        # Send newly created (not filled) form
        "form": NewTaskForm()
    })