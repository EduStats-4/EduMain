function addDdaks(points) {
  let current = parseInt(sessionStorage.getItem("ddaks") || "100", 10);
  
  current += points;

  sessionStorage.setItem("ddaks", current);

  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = current;
    
    scoreElement.classList.add("grow");
    setTimeout(() => scoreElement.classList.remove("grow"), 200);
  }
}

storedDaks = sessionStorage.getItem("ddaks")
ddaks = storedDaks !== null ? parseInt(storedDaks) : 100
document.getElementById("score").textContent = ddaks
document.getElementById("score").textContent = ddaks

document.getElementById("score").textContent = ddaks
sessionStorage.setItem("ddaks", ddaks)
