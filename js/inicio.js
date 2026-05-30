// ============================================================
//  Raíz Verde · inicio.js — Lógica de la página de inicio (Home)
//  Pinta los productos destacados dinámicamente desde el array.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("destacados");
  if (!contenedor) return;

  // Tomamos los 4 primeros productos como "destacados" y los pintamos.
  const destacados = PRODUCTOS.slice(0, 4);
  contenedor.innerHTML = destacados.map(crearTarjetaProducto).join("");

  // Delegación de eventos: un solo "click" gestiona todos los botones "Agregar".
  contenedor.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-agregar]");
    if (!boton) return;
    agregarAlCarrito(boton.dataset.agregar);
    avisarAgregado(boton); // helper compartido en utiles.js
  });
});
