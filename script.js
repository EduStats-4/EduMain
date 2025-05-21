function addDdaks(points) {
  let current = parseInt(sessionStorage.getItem("ddaks") || "100", 10);
  current += points;
  sessionStorage.setItem("ddaks", current);

  // Système DDAK amélioré
  document.addEventListener("DOMContentLoaded", function() {
    // Commencer les DDAKs
    const storedDdaks = sessionStorage.getItem("ddaks");
    let currentDdaks = storedDdaks ? parseInt(storedDdaks, 10) : 100;
    if (isNaN(currentDdaks)) currentDdaks = 100;
    sessionStorage.setItem("ddaks", currentDdaks);
    
    // Mettre à jour les scores à l'ouverture de la page
    updateAllScoreDisplays(currentDdaks);
    
    // Ajouter des clics aux boutons DDAK
    setupDdakEventListeners();
  });

  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = current;
    scoreElement.classList.add("grow");
    setTimeout(() => scoreElement.classList.remove("grow"), 200);
  }
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

  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = ddaks;
  }
}

function addDdaks(points) {
  const current = parseInt(sessionStorage.getItem("ddaks"), 10) || 100;
  const newTotal = Math.max(0, current + points);
  sessionStorage.setItem("ddaks", newTotal);
  updateAllScoreDisplays(newTotal);
  return newTotal;
}

function setupDdakEventListeners() {
  // Ajouter ici les actions quand on clique sur un bouton DDAK
}

// Quand la page est prête, on démarre les DDAKs
document.addEventListener("DOMContentLoaded", initializeDdaks);

// Rendre les fonctions disponibles partout
window.addDdaks = addDdaks;
window.updateAllScoreDisplays = updateAllScoreDisplays;
