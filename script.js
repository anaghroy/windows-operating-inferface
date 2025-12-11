const desktop = document.getElementById("desktop");
const contextMenu = document.getElementById("contextMenu");
const icons = document.getElementById("icons");
let folderCount = 1;
const startBtn = document.querySelector(".start-btn");
const startMenu = document.getElementById("start-menu");

// Disable default right-click
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  showMenu(e.pageX, e.pageY);
});

function showMenu(x, y) {
  contextMenu.style.display = "block";
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
}

// Hide menu on click
window.addEventListener("click", () => {
  contextMenu.style.display = "none";
});

// Handle menu actions
contextMenu.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  if (action === "new-folder") createFolder();
  if (action === "refresh") refreshEffect();
  if (action === "view-large") setIconSize(60);
  if (action === "view-medium") setIconSize(40);
  if (action === "view-small") setIconSize(25);
  if (action === "sort") sortIcons();
});

function createFolder() {
  const div = document.createElement("div");
  div.className = "icon";
  div.dataset.name = `Folder ${folderCount}`;
  div.innerHTML = `
    <div class="thumb">📁</div>
    <div class="label">Folder ${folderCount}</div>
  `;
  folderCount++;
  icons.appendChild(div);
}

function refreshEffect() {
  desktop.style.opacity = "0.3";
  setTimeout(() => (desktop.style.opacity = "1"), 150);
}

function setIconSize(size) {
  document.querySelectorAll(".icon .thumb").forEach((i) => {
    i.style.fontSize = size + "px";
  });
}

function sortIcons() {
  const iconList = Array.from(document.querySelectorAll(".icon"));
  iconList.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));

  icons.innerHTML = "";
  iconList.forEach((i) => icons.appendChild(i));
}

// Clock
setInterval(() => {
  const t = new Date();
  document.getElementById("clock").textContent =
    t.getHours().toString().padStart(2, "0") +
    ":" +
    t.getMinutes().toString().padStart(2, "0");
}, 1000);

// Drag & Drop
let dragged = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener("mousedown", (e) => {
  if (e.target.closest(".icon")) {
    dragged = e.target.closest(".icon");
    const rect = dragged.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    dragged.style.position = "absolute";
    dragged.style.zIndex = 9999;
  }
});

document.addEventListener("mousemove", (e) => {
  if (dragged) {
    dragged.style.left = e.clientX - offsetX + "px";
    dragged.style.top = e.clientY - offsetY + "px";
  }
});

document.addEventListener("mouseup", () => {
  if (dragged) {
    dragged.style.zIndex = 1;
    dragged = null;
  }
});

function updateTime() {
  const timeDiv = document.getElementById("time");

  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  timeDiv.innerHTML = `
    <span>${time}</span>
    <span style="font-size: 14px; opacity: 0.8;">${date}</span>
  `;
}

setInterval(updateTime, 1000);
updateTime();


// Start-Menu
startBtn.addEventListener("click", () => {
  startMenu.classList.toggle("hidden");
});

// Close Start Menu on clicking outside
document.addEventListener("click", (e) => {
  if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
    startMenu.classList.add("hidden");
  }
});
