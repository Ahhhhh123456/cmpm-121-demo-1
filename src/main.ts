import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jason's Game :)";

//New button element
const button = document.createElement("button");

//Button text
button.textContent = "Click 💀";

// BUtton styles
button.style.backgroundColor = "blue";
button.style.color = "white";
button.style.padding = "10px 20px";

// Adds the button to the website
document.body.appendChild(button);

// Initialize a counter
let counter = 0;

// Create a new div element to display the counter
const counterDiv = document.createElement("div");

// Set the initial content of the div
counterDiv.textContent = `${counter} skulls 💀`;

// Append the div to the app (or any other container like the body)
app.appendChild(counterDiv);

// Function to update the counter and div content
function updateCounter() {
  counter += 1;
  if (counter == 1) {
    counterDiv.textContent = `${counter} skull 💀`;
  } else {
    counterDiv.textContent = `${counter} skulls 💀`;
  }
}

// Add a click event listener to the button
button.addEventListener("click", () => {
  // Adds 1 skull when the button is clicked
  updateCounter();

  // Passive skull generator the button is clicked
  const passiveCounter = setInterval(() => {
    counter += 1;
    if (counter == 1) {
      counterDiv.textContent = `${counter} skull 💀`;
    } else {
      counterDiv.textContent = `${counter} skulls 💀`;
    }
  }, 1000);

  // Stops the passive counter after 5 seconds of not clicking
  setTimeout(() => {
    clearInterval(passiveCounter);
  }, 5000);
});

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
