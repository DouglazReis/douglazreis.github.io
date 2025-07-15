// Reinicia animação do carrossel automaticamente ao chegar no final
window.addEventListener("DOMContentLoaded", () => {
  const carrossel = document.getElementById("carrossel");
  const clone = carrossel.cloneNode(true);
  carrossel.parentElement.appendChild(clone);
});
