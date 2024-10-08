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

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
