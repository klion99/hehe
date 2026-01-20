const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.getElementById("buttonsArea");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const timeButtons = document.querySelectorAll(".timeBtn");
const optionButtons = document.querySelectorAll(".option");
const finalMsg = document.getElementById("finalMsg");
const chosenTimeText = document.getElementById("chosenTimeText");

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function placeNoNextToYes() {
  const areaRect = buttonsArea.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const gap = 12;
  const xRaw = (yesRect.right - areaRect.left) + gap;
  const yRaw = (yesRect.top - areaRect.top);

  const maxX = areaRect.width - noRect.width - 2;
  const maxY = areaRect.height - noRect.height - 2;

  noBtn.style.left = `${clamp(xRaw, 0, maxX)}px`;
  noBtn.style.top  = `${clamp(yRaw, 0, maxY)}px`;
}

function moveNoButton() {
  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = areaRect.width - btnRect.width - 2;
  const maxY = areaRect.height - btnRect.height - 2;

  const x = Math.floor(Math.random() * Math.max(1, maxX));
  const y = Math.floor(Math.random() * Math.max(1, maxY));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Make "No" run away
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Step switch on YES
yesBtn.addEventListener("click", () => {
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
});

// Time selection
timeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = btn.dataset.time;

    chosenTimeText.textContent = `${choice} it is!`;

    // Optional: disable buttons after selection
    timeButtons.forEach(b => (b.disabled = true));
    timeButtons.forEach(b => (b.style.opacity = "0.8"));
    step2.classList.add("hidden");
    step3.classList.remove("hidden");
  });
});

// option selection
optionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = btn.dataset.activity;

    chosenTimeText.textContent = `Yay ${choice} is awesome! Can't wait :p`;
    finalMsg.classList.remove("hidden");

    // Optional: disable buttons after selection
    optionsButtons.forEach(b => (b.disabled = true));
    optionsButtons.forEach(b => (b.style.opacity = "0.8"));
  });
});

// Initial placement + keep aligned on resize
placeNoNextToYes();
window.addEventListener("resize", placeNoNextToYes);

/* Keep your floating hearts code below this line (unchanged) */


function createHearts(count = 40) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    setHeartVars(h);

    // randomize start delays so they’re not synced
    h.style.animationDelay = `${rand(0, 2.5)}s, ${rand(0, 2.5)}s`;

    heartsWrap.appendChild(h);

    // every few seconds, pick a new drift direction so it feels random
    setInterval(() => setHeartVars(h), Math.floor(rand(2500, 5200)));
  }
}

createHearts(45);
