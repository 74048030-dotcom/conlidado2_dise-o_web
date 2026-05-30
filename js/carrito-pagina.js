// ============================================================
//  Raíz Verde · carrito-pagina.js
//  Renderiza la página del carrito y maneja sus interacciones:
//  cambiar cantidad, eliminar y vaciar. El subtotal y el total
//  se recalculan en tiempo real desde calcularTotales().
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const contenido = document.getElementById("carrito-contenido");
  if (!contenido) return;

  // --- Dibuja todo el carrito (líneas + resumen) ---
  function renderizar() {
    const { lineas, total } = calcularTotales();

    // Carrito vacío: mensaje + enlace al catálogo.
    if (lineas.length === 0) {
      contenido.innerHTML = `
        <div class="carrito-vacio">
          <div class="emoji">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Aún no agregaste plantas. ¡Explora el catálogo!</p>
          <a class="btn btn--primario" href="catalogo.html" style="margin-top:1rem">Ir al catálogo</a>
        </div>`;
      return;
    }

    // Líneas del carrito.
    const filas = lineas.map(linea => `
      <div class="linea-carrito" data-id="${linea.id}">
        <img class="linea-carrito__img" src="${rutaImagen(linea.imagen)}" alt="${linea.nombre}">
        <div>
          <div class="linea-carrito__nombre">${linea.nombre}</div>
          <div class="linea-carrito__precio">${formatearPrecio(linea.precio)} c/u</div>
        </div>
        <div class="cantidad">
          <button data-accion="restar" aria-label="Restar uno">−</button>
          <input type="number" min="1" value="${linea.cantidad}" data-cantidad aria-label="Cantidad">
          <button data-accion="sumar" aria-label="Sumar uno">+</button>
        </div>
        <div class="linea-carrito__subtotal">${formatearPrecio(linea.subtotal)}</div>
        <button class="linea-carrito__eliminar" data-accion="eliminar" aria-label="Eliminar">🗑</button>
      </div>
    `).join("");

    // Resumen con totales.
    const resumen = `
      <aside class="resumen">
        <h2>Resumen</h2>
        <div class="resumen__fila"><span>Productos</span><span>${lineas.length}</span></div>
        <div class="resumen__fila"><span>Subtotal</span><span>${formatearPrecio(total)}</span></div>
        <div class="resumen__fila"><span>Envío</span><span>Gratis</span></div>
        <div class="resumen__total"><span>Total</span><span>${formatearPrecio(total)}</span></div>
        <a class="btn btn--primario btn--bloque" href="contacto.html" style="margin-top:1rem">Continuar compra</a>
        <button class="btn btn--borde btn--bloque" id="btn-vaciar" style="margin-top:0.6rem">Vaciar carrito</button>
      </aside>`;

    contenido.innerHTML = `<div class="carrito-layout"><div>${filas}</div>${resumen}</div>`;
  }

  // --- Delegación de eventos: sumar, restar, eliminar ---
  contenido.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-accion]");
    if (!boton) return;

    const id = boton.closest(".linea-carrito")?.dataset.id;

    if (boton.id === "btn-vaciar") {
      vaciarCarrito();
      renderizar();
      return;
    }
    if (!id) return;

    const linea = obtenerCarrito().find(item => item.id === Number(id));
    const cantidadActual = linea ? linea.cantidad : 0;

    if (boton.dataset.accion === "sumar")    actualizarCantidad(id, cantidadActual + 1);
    if (boton.dataset.accion === "restar")   actualizarCantidad(id, cantidadActual - 1);
    if (boton.dataset.accion === "eliminar") eliminarDelCarrito(id);

    renderizar();
  });

  // --- Cambio manual de cantidad en el input (evento change) ---
  contenido.addEventListener("change", (evento) => {
    if (!evento.target.matches("[data-cantidad]")) return;
    const id = evento.target.closest(".linea-carrito").dataset.id;
    const nueva = parseInt(evento.target.value, 10);
    actualizarCantidad(id, isNaN(nueva) || nueva < 1 ? 1 : nueva);
    renderizar();
  });

  renderizar();
});
