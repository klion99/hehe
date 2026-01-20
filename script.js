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

let noAttempts = 0;
const noMsg = document.getElementById("noMsg");

const taunts = [
  "Nice try 😌",
  "Nope 😛",
  "Wait really? :(",
  "You sure about that? :((",
  "😢😢",
  "I'm sad now",
];


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
  noAttempts++;

  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = areaRect.width - btnRect.width - 2;
  const maxY = areaRect.height - btnRect.height - 2;

  // Make the movement "harder" each time (bigger jumps)
  // Starts gentle, then gets more dramatic
  const intensity = Math.min(1, noAttempts / 6); // ramps up to 1 by ~6 attempts

  // Pick a random spot, but bias away from current position as attempts increase
  const currentLeft = parseFloat(noBtn.style.left || "0");
  const currentTop = parseFloat(noBtn.style.top || "0");

  let x, y;
  for (let i = 0; i < 8; i++) {
    const candidateX = Math.floor(Math.random() * Math.max(1, maxX));
    const candidateY = Math.floor(Math.random() * Math.max(1, maxY));

    const dx = candidateX - currentLeft;
    const dy = candidateY - currentTop;
    const dist = Math.hypot(dx, dy);

    // Require larger distance as intensity increases
    const minDist = 40 + intensity * 140;

    if (dist >= minDist || i === 7) {
      x = candidateX;
      y = candidateY;
      break;
    }
  }

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // Update message
  if (noMsg) {
    noMsg.textContent = taunts[Math.min(noAttempts - 1, taunts.length - 1)];
  }

  // Add shake after a few attempts
  if (noAttempts >= 4) {
    noBtn.classList.add("shake");
  }

  // After enough attempts, remove "No" completely
  if (noAttempts >= 10) {
    noBtn.style.display = "none";
    if (noMsg) noMsg.textContent = "😾😼😼 no no for u hehe";
  }
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
    optionButtons.forEach(b => (b.disabled = true));
    optionButtons.forEach(b => (b.style.opacity = "0.8"));
  });
});


// Initial placement + keep aligned on resize
placeNoNextToYes();
window.addEventListener("resize", placeNoNextToYes);

/* Keep your floating hearts code below this line (unchanged) */


const heartsWrap = document.getElementById("hearts");

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function setHeartVars(el) {
  el.style.setProperty("--x", rand(0, 100) + "vw");
  el.style.setProperty("--y", rand(0, 100) + "vh");
  el.style.setProperty("--size", rand(10, 22) + "px");
  el.style.setProperty("--op", rand(0.25, 0.85));
  el.style.setProperty("--dx", rand(-50, 50) + "px");
  el.style.setProperty("--dy", rand(-50, 50) + "px");
  el.style.setProperty("--dur", rand(3.5, 8) + "s");
}

function createHearts(count = 45) {
  // clear old hearts (prevents duplicates on reload)
  heartsWrap.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    setHeartVars(h);

    // stagger animation start so it's not synced
    h.style.animationDelay = `${rand(0, 2.5)}s, ${rand(0, 2.5)}s`;

    heartsWrap.appendChild(h);

    // every few seconds, update drift direction / position
    setInterval(() => setHeartVars(h), Math.floor(rand(2500, 5200)));
  }
}

// run once
createHearts(55);
