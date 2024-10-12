import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jason's Game :)";

// Initialize the counter and growth rate
let counter = 0;
let growthRate = 0;

// Current growth rate display
const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} skulls/sec`;
app.appendChild(growthRateDiv);

// Create the main button element
const button = document.createElement("button");
button.textContent = "Click 💀";
document.body.appendChild(button);

// Array for upgrades
const upgrades = [
  {
    name: "A",
    initialCost: 10,
    currentCost: 10,
    rate: 0.1,
    button: document.createElement("button"),
    count: 0,
  },
  {
    name: "B",
    initialCost: 100,
    currentCost: 100,
    rate: 2.0,
    button: document.createElement("button"),
    count: 0,
  },
  {
    name: "C",
    initialCost: 1000,
    currentCost: 1000,
    rate: 50.0,
    button: document.createElement("button"),
    count: 0,
  },
];

// New div to display the count of purchased items
const upgradeCountDiv = document.createElement("div");
updateUpgradeCounts();
app.appendChild(upgradeCountDiv);

// Create a new div element to display the counter
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} skulls 💀`;
app.appendChild(counterDiv);

app.appendChild(button);

// Initialize upgrade buttons
upgrades.forEach((upgrade) => {
  upgrade.button.textContent = `Buy ${upgrade.name} (${Math.round(upgrade.currentCost)} skulls)`;
  upgrade.button.disabled = true;
  document.body.appendChild(upgrade.button);
});

// Append upgrade buttons to the app
upgrades.forEach((upgrade) => app.appendChild(upgrade.button));

// Function to update the counter display
function updateCounter() {
  const roundedCounter = Math.floor(counter);
  counterDiv.textContent = `${roundedCounter} skull${roundedCounter === 1 ? "" : "s"} 💀`;
}

// Update the growth rate display
function updateGrowthRateDisplay() {
  growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} skull${growthRate === 1 ? "" : "s"}/sec`;
}

// Update the upgrade counts display
function updateUpgradeCounts() {
  const counts = upgrades
    .map((upgrade) => `${upgrade.name}: ${upgrade.count}`)
    .join(", ");
  upgradeCountDiv.textContent = `Upgrades: ${counts}`;
}

// Function to handle counter growth based on growthRate
function animate(time: number) {
  const timeDiff = time - lastTimestamp;
  if (lastTimestamp !== 0) {
    const increaseAmount = (timeDiff / 1000) * growthRate;
    counter += increaseAmount;
    updateCounter();
    checkUpgradeAvailability();
  }
  lastTimestamp = time;
  requestAnimationFrame(animate);
}

let lastTimestamp = 0;
requestAnimationFrame(animate);

// Event listener for the main click button (adds 1 skull)
button.addEventListener("click", () => {
  counter += 1;
  updateCounter();
  checkUpgradeAvailability();
});

// Function to check if player's skull count allows purchases
function checkUpgradeAvailability() {
  upgrades.forEach((upgrade) => {
    upgrade.button.disabled = counter < upgrade.currentCost;
  });
}

// Add event listeners for each upgrade button
upgrades.forEach((upgrade) => {
  upgrade.button.addEventListener("click", () => {
    if (counter >= upgrade.currentCost) {
      counter -= upgrade.currentCost; // Deduct current cost
      growthRate += upgrade.rate; // Increase growth rate
      upgrade.count += 1; // Increment purchase count
      upgrade.currentCost = Math.round(upgrade.currentCost * 1.15); // Update and round the cost
      upgrade.button.textContent = `Buy ${upgrade.name} (${Math.round(upgrade.currentCost)} skulls)`;
      updateCounter();
      updateGrowthRateDisplay();
      updateUpgradeCounts();
      checkUpgradeAvailability();
    }
  });
});

// Set the document title
document.title = gameName;

// Create and append the game name header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
