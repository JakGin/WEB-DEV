import dogs from "./data.js";
import Dog from "./Dog.js";

function like() {
  if (!clickAllowed) return;
  clickAllowed = false;

  document.querySelector(".like-button").style.backgroundColor = "#DBFFF4";
  setTimeout(() => {
    currentDog.setHasBeenSwiped(true);
    currentDog.setHasBeenLiked(true);
    document.querySelector(".like-button").style.backgroundColor = "#fff";
    displayNewDog();
    clickAllowed = true;
  }, 1000);
}

function nope() {
  if (!clickAllowed) return;

  clickAllowed = false;

  document.querySelector(".cross-button").style.backgroundColor = "#FFE7EF";
  setTimeout(() => {
    currentDog.setHasBeenSwiped(true);
    currentDog.setHasBeenLiked(false);
    document.querySelector(".cross-button").style.backgroundColor = "#fff";
    displayNewDog();
    clickAllowed = true;
  }, 1000);
}

function displayNewDog() {
  if (currentDogId >= dogsToDisplay.length) {
    currentDogId = 0;
  }
  currentDog = dogsToDisplay[currentDogId];
  currentDogId++;
  document.querySelector(".dog-image-container").innerHTML =
    currentDog.getDogHtml();
}

function createDogObjects() {
  return dogs.map((dog) => {
    return new Dog(dog);
  });
}

let dogsToDisplay = createDogObjects();
let currentDog = {};
let currentDogId = 0;
let clickAllowed = true;

document.querySelector(".cross-button").addEventListener("click", nope);
document.querySelector(".like-button").addEventListener("click", like);

displayNewDog();
