// Système DDAK amélioré
document.addEventListener("DOMContentLoaded", function() {
  // On récupère le score DDAK ou on met 100 si c’est vide
  ddaksStocké = sessionStorage.getItem("ddaks")
  if (ddaksStocké !== null) {
    ddaksActuel = parseInt(ddaksStocké, 10)
  } else {
    ddaksActuel = 100
  }

  if (isNaN(ddaksActuel)) ddaksActuel = 100

  sessionStorage.setItem("ddaks", ddaksActuel)

  // On met à jour les zones de score
  mettreAJourAffichageScore(ddaksActuel)

  // On prépare les boutons (s’il y en a)
  preparerBoutonsDdak()
})

// Fonction pour afficher le score dans toutes les zones
function mettreAJourAffichageScore(score) {
  zonesAffichage = document.querySelectorAll('#score, #nav-score, .ddak-amount, #points')
  zonesAffichage.forEach(zone => {
    if (zone) {
      zone.textContent = score
      zone.classList.add('grandir')
      setTimeout(() => zone.classList.remove('grandir'), 300)
    }
  })
}

// Fonction pour ajouter ou enlever des DDAKs
function ajouterDdaks(nombre) {
  ddaksSauvegardé = sessionStorage.getItem("ddaks")
  if (ddaksSauvegardé !== null) {
    ddaksActuel = parseInt(ddaksSauvegardé, 10)
  } else {
    ddaksActuel = 100
  }

  if (isNaN(ddaksActuel)) ddaksActuel = 100

  totalNouveau = Math.max(0, ddaksActuel + nombre)
  sessionStorage.setItem("ddaks", totalNouveau)
  mettreAJourAffichageScore(totalNouveau)
  return totalNouveau
}

// Fonction vide pour ajouter des boutons plus tard
function preparerBoutonsDdak() {
  // Tu peux ajouter ici des événements pour les boutons
}

// On rend les fonctions utilisables partout
window.ajouterDdaks = ajouterDdaks
window.mettreAJourAffichageScore = mettreAJourAffichageScore
