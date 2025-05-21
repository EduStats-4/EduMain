let ddaks = 100; // nombre initial de ddaks

document.getElementById("submitBtn").addEventListener("click", function () {
  if (ddaks <= 0) {
    document.getElementById("message").textContent = "Tu n’as plus de ddaks pour jouer.";
    document.getElementById("message").className = "incorrect";
    return; // stop ici si pas assez de ddaks
  }

  const reponse = document.getElementById("answer").value.trim().toLowerCase();
  if (reponse === currentWord.toLowerCase()) {
    ddaks += 20;
    document.getElementById("message").textContent = "Correct ! +20 ddaks.";
    document.getElementById("message").className = "correct";
  } else {
    ddaks -= 50;
    document.getElementById("message").textContent = "Faux ! -50 ddaks.";
    document.getElementById("message").className = "incorrect";
  }

  if (ddaks < 0) ddaks = 0; // pour éviter qu'on aille en négatif

  document.getElementById("nav-score").textContent = ddaks;
  document.getElementById("points").textContent = `ddaks: ${ddaks}`;

  // tu peux aussi désactiver le bouton si à 0
  if (ddaks === 0) {
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("submitBtn").textContent = "Plus de ddaks!";
  }
});
