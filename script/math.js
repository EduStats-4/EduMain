
// variables globales pour le jeu
let reponse // stocke le nombre à deviner
let essais = 0 // compte le nombre de tentatives
let indiceReponse = "" // stocke les indices générés

// fonction pour ajouter/supprimer des ddaks (points)
function addDdaks(points) {
    // récupère le score actuel depuis le sessionstorage
    let current = parseInt(sessionStorage.getItem("ddaks") || "100", 10)
    // ajoute ou retire les points
    current += points
    // sauvegarde le nouveau score
    sessionStorage.setItem("ddaks", current)

    // met à jour l'affichage du score
    updateAllScoreDisplays(current)
    return current
}

// génère un nouveau nombre aléatoire et réinitialise le jeu
function numRandom() {
    // génère un nombre entre 1 et 100
    reponse = Math.floor(Math.random() * 100 + 1)
    // réinitialise le compteur d'essais
    essais = 0
    // vide les indices
    indiceReponse = ""

    // affiche le message d'introduction
    document.getElementById("message").textContent =
        "devine un nombre entre 1 et 100. tu as 10 essais. des indices apparaîtront progressivement."
    document.getElementById("indice").textContent = ""

    // vide l'historique des tentatives
    const tbody = document.querySelector("#guessTable tbody")
    tbody.innerHTML = ""
}

// vérifie si l'entrée est valide (nombre entre 1 et 100)
function verifieInput(entree) {
    return !(isNaN(entree) || entree < 1 || entree > 100)
}

// génère les indices en fonction du nombre à deviner
function verifieNum() {
    indiceReponse = ""

    // tableau des indices possibles
    const indices = [
        ["le nombre est pair", "le nombre est impair"],
        ["le nombre est un multiple de 3", "le nombre n'est pas un multiple de 3"],
        ["le nombre est premier", "le nombre n'est pas premier"],
        ["le nombre est un multiple de 5", "le nombre n'est pas un multiple de 5"],
        ["le nombre est un multiple de 7", "le nombre n'est pas un multiple de 7"],
        ["le nombre est un multiple de 13", "le nombre n'est pas un multiple de 13"],
        ["le nombre est un multiple de 17", "le nombre n'est pas un multiple de 17"],
        ["le nombre est plus petit que la racine carrée de 49", "le nombre est plus grand que le onzième chiffre de la séquence de fibonacci"],
        ["le nombre est entre 8 et 88 inclus", "le nombre n'est pas entre 8 et 88"]
    ]

    // liste des nombres premiers inférieurs à 100
    const premiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

    // construction des indices en fonction des propriétés du nombre
    indiceReponse += (reponse % 2 === 0 ? indices[0][0] : indices[0][1]) + ". "
    indiceReponse += (reponse % 3 === 0 ? indices[1][0] : indices[1][1]) + ". "
    indiceReponse += (premiers.includes(reponse) ? indices[2][0] : indices[2][1]) + ". "
    indiceReponse += (reponse % 5 === 0 ? indices[3][0] : indices[3][1]) + ". "
    indiceReponse += (reponse % 7 === 0 ? indices[4][0] : indices[4][1]) + ". "
    indiceReponse += (reponse % 13 === 0 ? indices[5][0] : indices[5][1]) + ". "
    indiceReponse += (reponse % 17 === 0 ? indices[6][0] : indices[6][1]) + ". "

    // indices conditionnels supplémentaires
    if (reponse < 7) {
        indiceReponse += indices[7][0] + ". "
    } else if (reponse > 89) {
        indiceReponse += indices[7][1] + ". "
    }

    if (reponse >= 8 && reponse <= 88) {
        indiceReponse += indices[8][0] + ". "
    } else {
        indiceReponse += indices[8][1] + ". "
    }
}

// fonction principale pour vérifier la devinette
function checkGuess() {
    // récupère la valeur entrée par le joueur
    const entree = parseInt(document.getElementById("guess").value)
    const message = document.getElementById("message")
    const indice = document.getElementById("indice")

    // vérifie si un nombre a été généré
    if (typeof reponse === "undefined") {
        indice.textContent = "clique sur 'nouveau nombre' pour commencer une partie."
        return
    }

    // vérifie si l'entrée est valide
    if (!verifieInput(entree)) {
        message.textContent = "entrée invalide ! saisir une valeur entre 1 et 100."
        indice.textContent = ""
        return
    }

    // incrémente le compteur d'essais
    essais++

    let indiceFinale = ""

    // vérifie si la réponse est correcte
    if (entree === reponse) {
        reponse = undefined
        // calcule le gain en points (inversement proportionnel au nombre d'essais)
        const gain = parseInt((100 / essais) * 4)
        message.textContent = `bravo ! tu as trouvé en ${essais} essai(s) et tu as gagné ${gain} ddaks!`
        addToHistory(essais, entree, "bonne réponse !")
        addDdaks(gain)
        indice.textContent = "clique sur 'nouveau nombre' pour commencer une partie."
        return
    }

    // vérifie si le joueur a épuisé ses essais
    if (essais >= 10) {
        message.textContent = `womp womp... tu as perdu. le nombre était ${reponse}.`
        indice.textContent = ""
        addToHistory(essais, entree, "fin de partie.")
        essais = 0
        reponse = undefined
        return
    }

    message.textContent = "ce n'est pas le bon nombre ! essaie encore."

    // ajoute un indice de comparaison tous les 2 essais
    if (!(essais % 2 === 0)) {
        if (entree < reponse) {
            indiceFinale += `le nombre est plus grand que ${entree}. `
        } else {
            indiceFinale += `le nombre est plus petit que ${entree}. `
        }
    }

    // génère les indices spécifiques
    verifieNum()
    const splitIndices = indiceReponse.split(". ")
    // ajoute un nouvel indice à chaque essai
    if (splitIndices[essais - 1]) {
        indiceFinale += splitIndices[essais - 1] + "."
    }

    // affiche l'indice et ajoute à l'historique
    indice.textContent = indiceFinale
    addToHistory(essais, entree, indiceFinale)
}

// ajoute une tentative à l'historique
function addToHistory(essai, guess, clue) {
    const tbody = document.querySelector("#guessTable tbody")
    const row = document.createElement("tr")

    // crée les cellules du tableau
    const tdEssai = document.createElement("td")
    const tdGuess = document.createElement("td")
    const tdClue = document.createElement("td")

    // remplit les cellules
    tdEssai.textContent = essai
    tdGuess.textContent = guess
    tdClue.textContent = clue

    // ajoute les cellules à la ligne
    row.appendChild(tdEssai)
    row.appendChild(tdGuess)
    row.appendChild(tdClue)

    // ajoute la ligne au tableau
    tbody.appendChild(row)
}
