let counter = 0;

function count() {
    counter++;
    document.querySelector("h1").innerHTML = counter;

    if (counter % 10 === 0) {
        // formatted string with value
        alert(`The count is ${counter}`);
    }
}

// usage of addEventListener('Event', 'Function')
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("button").onclick = count;
});