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
    
    const roundedCounter = Math.floor(counter); // Round down to the nearest whole number
    if (roundedCounter === 1) {
      counterDiv.textContent = `${roundedCounter} skull 💀`;
    } else {
      counterDiv.textContent = `${roundedCounter} skulls 💀`;
    }
}

// Animation-related variables
let lastTimestamp = 0; // Tracks the last frame's timestamp
const passiveIncreaseRate = 1 / 1000; // The rate of increase per millisecond (1 unit per second)

// Function to handle the animation frame
function animate(time: number) {
  // Calculate the time passed since the last frame
  if (lastTimestamp !== 0) {
    const timeDiff = time - lastTimestamp; // Time difference in milliseconds
    const increaseAmount = timeDiff * passiveIncreaseRate; // Increase counter based on time passed

    counter += increaseAmount; // Increment counter
    updateCounter(); // Update the displayed counter
  }

  lastTimestamp = time;
  requestAnimationFrame(animate); // Continue the animation
}

// Start the passive counter when the button is clicked
button.addEventListener("click", () => {
  // Adds 1 skull when the button is clicked
  counter += 1;
  updateCounter();

  // Start the requestAnimationFrame loop
  if (lastTimestamp === 0) {
    requestAnimationFrame(animate);
  }
});

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
