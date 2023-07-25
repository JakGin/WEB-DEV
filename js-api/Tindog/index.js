import dogs from "./data.js";
import Dog from "./Dog.js";

function like() {
  if (!clickAllowed) return;
  clickAllowed = false;

  currentDog.setHasBeenSwiped(true);
  currentDog.setHasBeenLiked(true);

  document.querySelector(".like-button").style.backgroundColor = "#DBFFF4";
  displayDog()
  setDogBadgeHtml()

  setTimeout(() => {
    document.querySelector(".like-button").style.backgroundColor = "#fff";
    displayNewDog();
    clickAllowed = true;
  }, 1000);
}

function nope() {
  if (!clickAllowed) return;

  clickAllowed = false;

  currentDog.setHasBeenSwiped(true);
  currentDog.setHasBeenLiked(false);

  document.querySelector(".cross-button").style.backgroundColor = "#FFE7EF";
  displayDog()
  setDogBadgeHtml()

  setTimeout(() => {
    document.querySelector(".cross-button").style.backgroundColor = "#fff";
    removeCurrentDog()
    displayNewDog();
    clickAllowed = true;
  }, 1000);
}

function displayNewDog() {
  currentDogId++;
  if (currentDogId >= dogsToDisplay.length) {
    currentDogId = 0;
  }
  currentDog = dogsToDisplay[currentDogId];
  document.querySelector(".dog-image-container").innerHTML =
    currentDog.getDogHtml();
  if (dogsToDisplay.length == 1) {
    setDogBadgeHtml()
    document.querySelector(".cross-button").removeEventListener("click", nope);
    document.querySelector(".like-button").removeEventListener("click", like);
  }
}

function displayDog() {
  currentDog = dogsToDisplay[currentDogId];
  document.querySelector(".dog-image-container").innerHTML =
    currentDog.getDogHtml();
}

function createDogObjects() {
  return dogs.map((dog) => {
    return new Dog(dog);
  });
}

function setDogBadgeHtml() {
  const dogBadgeUrl = currentDog.hasBeenLiked ?
    "./images/badge-like.png"
    : 
    "./images/badge-nope.png"

  document.querySelector(".dog-badge").innerHTML =
    `<img src="${dogBadgeUrl}">`
}

function removeCurrentDog() {
  dogsToDisplay.splice(currentDogId, 1)
}

let dogsToDisplay = createDogObjects();
let currentDog = {};
let currentDogId = 0;
let clickAllowed = true;

document.querySelector(".cross-button").addEventListener("click", nope);
document.querySelector(".like-button").addEventListener("click", like);

displayNewDog();
