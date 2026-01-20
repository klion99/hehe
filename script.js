const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.getElementById("buttonsArea");
const result = document.getElementById("result");

function moveNoButton() {
  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Keep the button fully inside the area
  const maxX = areaRect.width - btnRect.width;
  const maxY = areaRect.height - btnRect.height;

  // Random new position
  const x = Math.max(0, Math.floor(Math.random() * maxX));
  const y = Math.max(0, Math.floor(Math.random() * maxY));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Make "No" run away when hovered or focused/touched
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // prevent accidental click on mobile
  moveNoButton();
});

// If they somehow click it, still move it
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  result.classList.remove("hidden");
  // Optional: hide buttons after yes
  buttonsArea.style.display = "none";
});
