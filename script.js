const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.getElementById("buttonsArea");
const result = document.getElementById("result");
const heartsWrap = document.getElementById("hearts");

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

// Yes click
yesBtn.addEventListener("click", () => {
  result.classList.remove("hidden");
  buttonsArea.style.display = "none";
});

// Initial placement + keep aligned on resize
placeNoNextToYes();
window.addEventListener("resize", placeNoNextToYes);

/* ---------------------------
   Floating hearts background
---------------------------- */

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function setHeartVars(el) {
  const size = rand(8, 18);
  const x = rand(0, 100);
  const y = rand(0, 100);
  const dx = rand(-40, 40);
  const dy = rand(-40, 40);
  const rot = rand(-25, 25) + "deg";
  const dur = rand(3.5, 7.5) + "s";
  const op = rand(0.25, 0.75);

  el.style.setProperty("--size", size + "px");
  el.style.setProperty("--x", x + "vw");
  el.style.setProperty("--y", y + "vh");
  el.style.setProperty("--dx", dx + "px");
  el.style.setProperty("--dy", dy + "px");
  el.style.setProperty("--rot", rot);
  el.style.setProperty("--dur", dur);
  el.style.setProperty("--op", op);
}

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
