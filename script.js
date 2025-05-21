function addDdaks(points) {
  let current = parseInt(sessionStorage.getItem("ddaks") || "100", 10);
  current += points;
  sessionStorage.setItem("ddaks", current);
// Enhanced DDAK System
document.addEventListener("DOMContentLoaded", function() {
  // Initialize DDAKs
  const storedDdaks = sessionStorage.getItem("ddaks");
  let currentDdaks = storedDdaks ? parseInt(storedDdaks, 10) : 100;
  if (isNaN(currentDdaks)) currentDdaks = 100;
  sessionStorage.setItem("ddaks", currentDdaks);
  
  // Update all score displays on page load
  updateAllScoreDisplays(currentDdaks);
  
  // Add event listeners for any DDAK-related buttons
  setupDdakEventListeners();
});

  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = current;
    scoreElement.classList.add("grow");
    setTimeout(() => scoreElement.classList.remove("grow"), 200);
  }
function updateAllScoreDisplays(score) {
  const displays = document.querySelectorAll('#score, #nav-score, .ddak-amount, #points');
  displays.forEach(display => {
    if (display) {
      display.textContent = score;
      display.classList.add('grow');
      setTimeout(() => display.classList.remove('grow'), 300);
    }
  });
}

function initializeDdaks() {
  let storedDaks = sessionStorage.getItem("ddaks");
  let ddaks = storedDaks !== null ? parseInt(storedDaks, 10) : 100;
  sessionStorage.setItem("ddaks", ddaks);
function addDdaks(points) {
  const current = parseInt(sessionStorage.getItem("ddaks"), 10) || 100;
  const newTotal = Math.max(0, current + points);
  sessionStorage.setItem("ddaks", newTotal);
  updateAllScoreDisplays(newTotal);
  return newTotal;
}

  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = ddaks;
  }
function setupDdakEventListeners() {
  // Add any event listeners for DDAK-related buttons here
}

document.addEventListener("DOMContentLoaded", initializeDdaks);
// Make functions available globally
window.addDdaks = addDdaks;
window.updateAllScoreDisplays = updateAllScoreDisplays;
