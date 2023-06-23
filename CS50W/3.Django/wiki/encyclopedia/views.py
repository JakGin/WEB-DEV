from markdown2 import Markdown
import random

from django.shortcuts import render, redirect
from django import forms

from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })


def entry(request, entry):
    content = util.get_entry(entry)
    if content: 
        return render(request, "encyclopedia/entry.html", {
            "entry": entry,
            "content": Markdown().convert(content)
        })
    return render(request, "encyclopedia/error.html", {
        "entry": entry
    })


def random_entry(request):
    random_entry = random.choice(util.list_entries())
    return redirect("encyclopedia:entry", entry=random_entry)



def search(request):
    if request.GET:
        searched_entry = request.GET["q"]
        if searched_entry.lower() in map(str.lower, util.list_entries()):
            return redirect("encyclopedia:entry", entry=searched_entry)
        possible_entries = [entry for entry in util.list_entries() if searched_entry.lower() in entry.lower()]
        return render(request, "encyclopedia/search.html", {
            "entries": possible_entries
        })
    return redirect("encyclopedia:index")


class Add_entry_form(forms.Form):
    title = forms.CharField(label="Title")
    content = forms.CharField(widget=forms.Textarea)


def add_entry(request):
    if request.method == "POST":
        form = Add_entry_form(request.POST)
        if form.is_valid():
            title = form.cleaned_data["title"]
            content = form.cleaned_data["content"]
            if title.lower() in map(str.lower, util.list_entries()):
                return render(request, "encyclopedia/add_entry.html", {
                    "form": form,
                    "error_massage": "Entry with this title already exists"
                })
            util.save_entry(title, content)
            return redirect("encyclopedia:entry", entry=title)
        return render(request, "encyclopedia/add_entry.html", {
            "form": form,
            "error_massage": ""
        })

    return render(request, "encyclopedia/add_entry.html", {
        "form": Add_entry_form(),
        "error_massage": ""
    })


def edit_entry(request, title):
    if request.method == "POST":
        form = Add_entry_form(request.POST)
        if form.is_valid():
            content = form.cleaned_data["content"]
            old_title = title
            title = form.cleaned_data["title"]
            if old_title != title:
                util.delete_entry(old_title)
            util.save_entry(title, content)
            return redirect("encyclopedia:entry", entry=title)
        else:
            return render(request, "encyclopedia/edit_entry", {
                "title": title,
                "form": form
            })

    content = util.get_entry(title)
    if content:
        form = Add_entry_form(initial={"content": content, "title": title})
        return render(request, "encyclopedia/edit_entry.html", {
            "title": title,
            "form": form
        })