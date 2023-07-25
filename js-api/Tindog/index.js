import dogs from "./data.js"
import Dog from "./Dog.js"

const dog = new Dog(dogs[0])
document.querySelector(".dog-image-container").innerHTML = dog.getDogHtml()