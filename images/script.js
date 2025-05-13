function addDdaks(points) {
  let current = parseInt(sessionStorage.getItem("ddaks") || "0", 10);
  
  current += points;

  sessionStorage.setItem("ddaks", current);

  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = current;
    
    scoreElement.classList.add("grow");
    setTimeout(() => scoreElement.classList.remove("grow"), 200);
  }
}
