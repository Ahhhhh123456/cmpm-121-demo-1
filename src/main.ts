import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jason's Halloween Store";

// Initialize the counter and growth rate
let counter = 0;
let growthRate = 0;

// Current growth rate display
const growthRateDiv = document.createElement("div");
growthRateDiv.className = "growth-rate";
growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} skulls/sec`;
app.appendChild(growthRateDiv);

// Create the main button element
const emojiDiv = document.createElement("div");
emojiDiv.className = "skull-emoji";
emojiDiv.textContent = "💀";
app.appendChild(emojiDiv);

// Interface and available items
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Pumpkin 🎃",
    cost: 10,
    rate: 0.1,
    description: " I'm by your door >:D ",
  },
  {
    name: "Ghost 👻",
    cost: 100,
    rate: 2,
    description: "Boo! Did I scare you?",
  },
  {
    name: "Zombie 🧟‍♂️",
    cost: 1000,
    rate: 50,
    description: "Brains taste like chicken",
  },
  {
    name: "Blood 🩸",
    cost: 2000,
    rate: 100,
    description: "Yummy, tastes like iron.",
  },
  { name: "Demon 😈", cost: 4000, rate: 200, description: "MWA HA HA HA!" },
];

// Creating upgrade elements from availableItems
const upgrades = availableItems.map((item) => ({
  ...item,
  currentCost: item.cost,
  button: document.createElement("button"),
  count: 0,
}));

// New div to display the count of purchased items
const upgradeCountDiv = document.createElement("div");
upgradeCountDiv.className = "upgrade-count";
updateUpgradeCounts();
app.appendChild(upgradeCountDiv);

// Create a new div element to display the counter
const counterDiv = document.createElement("div");
counterDiv.className = "amount";
counterDiv.textContent = `${counter} skulls 💀`;
app.appendChild(counterDiv);

const upgradeContainer = document.createElement("div");
upgradeContainer.className = "upgrade-container";
app.appendChild(upgradeContainer);

// Append upgrade buttons to this new container
upgrades.forEach((upgrade) => {
  upgrade.button.textContent = `Buy ${upgrade.name} (${Math.round(upgrade.currentCost)} skulls)`;
  upgrade.button.disabled = true;
  upgradeContainer.appendChild(upgrade.button);
});

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
    .map((upgrade) => ` ${upgrade.name}: ${upgrade.count}`)
    .join(" |");
  upgradeCountDiv.textContent = `${counts}`;
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
emojiDiv.addEventListener("click", () => {
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

upgrades.forEach((upgrade) => {
  const buttonContainer = document.createElement("div"); // Container for button and tooltip
  buttonContainer.className = "button-container";

  const tooltip = document.createElement("span"); // Tooltip element
  tooltip.className = "tooltip";
  tooltip.textContent = `${upgrade.description} (Upgrades ${upgrade.rate} skulls/sec)`; // Use description

  upgrade.button.textContent = `Buy ${upgrade.name} (${Math.round(upgrade.currentCost)} skulls)`;
  upgrade.button.disabled = true;

  buttonContainer.appendChild(upgrade.button); // Add button to container
  buttonContainer.appendChild(tooltip); // Add tooltip to container
  upgradeContainer.appendChild(buttonContainer); // Add container to upgradeContainer
});

// Set the document title
document.title = gameName;

// Create and append the game name header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
