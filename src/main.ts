import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jason's Game :)";

// Initialize the counter and growth rate
let counter = 0;
let growthRate = 0; // Start with no automatic growth

// Create the main button element
const button = document.createElement("button");
button.textContent = "Click 💀";
button.style.backgroundColor = "blue";
button.style.color = "white";
button.style.padding = "10px 20px";
document.body.appendChild(button);

// Create a new div element to display the counter
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} skulls 💀`;
app.appendChild(counterDiv);

// Create a purchasable upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Buy Upgrade (10 skulls)";
upgradeButton.style.padding = "10px 20px";
upgradeButton.disabled = true; // Disable initially
document.body.appendChild(upgradeButton);

// Function to update the counter display
function updateCounter() {
  const roundedCounter = Math.floor(counter); // Round to nearest integer
  if (roundedCounter === 1) {
    counterDiv.textContent = `${roundedCounter} skull 💀`;
  } else {
    counterDiv.textContent = `${roundedCounter} skulls 💀`;
  }
}

// Function to handle counter growth based on growthRate
let lastTimestamp = 0;
function animate(time: number) {
  if (lastTimestamp !== 0) {
    const timeDiff = time - lastTimestamp;
    const increaseAmount = (timeDiff / 1000) * growthRate; // Counter increases based on growthRate
    counter += increaseAmount;
    updateCounter();
    checkUpgradeAvailability(); // Check if the upgrade can be purchased
  }
  lastTimestamp = time;
  requestAnimationFrame(animate);
}

// Start animation loop
requestAnimationFrame(animate);

// Event listener for the main click button (adds 1 skull)
button.addEventListener("click", () => {
  counter += 1;
  updateCounter();
  checkUpgradeAvailability(); // Check if the upgrade button should be enabled
});

// Function to check if the player can afford the upgrade
function checkUpgradeAvailability() {
  if (counter >= 10) {
    upgradeButton.disabled = false; // Enable the button if player has 10 or more skulls
  } else {
    upgradeButton.disabled = true; // Disable the button if they have less than 10
  }
}

// Event listener for the upgrade button
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10; // Deduct 10 skulls from the counter
    growthRate += 1; // Increase the growth rate by 1 unit per second
    updateCounter();
    checkUpgradeAvailability(); // Recheck if the upgrade can be purchased again
  }
});

// Set the document title
document.title = gameName;

// Create and append the game name header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
