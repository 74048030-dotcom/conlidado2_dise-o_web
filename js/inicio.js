// ============================================================
//  Raíz Verde · inicio.js — Lógica de la página de inicio (Home)
//  Pinta los productos destacados dinámicamente desde el array.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("destacados");
  if (!contenedor) return;

  // Tomamos los 4 primeros productos como "destacados" y los pintamos.
  // Cada tarjeta va dentro de una columna del grid de Bootstrap (4 por fila en desktop).
  const destacados = PRODUCTOS.slice(0, 4);
  contenedor.innerHTML = destacados
    .map(p => `<div class="col-12 col-sm-6 col-lg-3">${crearTarjetaProducto(p)}</div>`)
    .join("");

  // Delegación de eventos: un solo "click" gestiona todos los botones "Agregar".
  contenedor.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-agregar]");
    if (!boton) return;
    agregarAlCarrito(boton.dataset.agregar);
    avisarAgregado(boton); // helper compartido en utiles.js
  });
});
