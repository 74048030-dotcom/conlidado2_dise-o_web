// ============================================================
//  Raíz Verde · detalle.js — Vista de detalle de un producto
//  Lee el id de la URL (?id=) y construye la vista dinámicamente.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("detalle");
  if (!contenedor) return;

  // 1. Leer el id del producto desde la query string (?id=...).
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const producto = buscarProductoPorId(id);

  // 2. Si el id no existe, mostrar un aviso y enlace de regreso.
  if (!producto) {
    contenedor.innerHTML = `
      <div class="sin-resultados">
        <strong>Producto no encontrado</strong>
        <a class="detalle__volver" href="catalogo.html">← Volver al catálogo</a>
      </div>`;
    return;
  }

  // 3. Construir la vista de detalle.
  document.title = `${producto.nombre} · Raíz Verde`;
  contenedor.innerHTML = `
    <div class="detalle__media">
      <img src="${rutaImagen(producto.imagen)}" alt="${producto.nombre}">
    </div>
    <div class="detalle__info">
      <a class="detalle__volver" href="catalogo.html">← Volver al catálogo</a>
      <p class="detalle__categoria">${producto.categoria}</p>
      <h1 class="detalle__nombre">${producto.nombre}</h1>
      <p class="detalle__precio">${formatearPrecio(producto.precio)}</p>
      <p class="detalle__desc">${producto.descripcion}</p>
      <button class="btn btn--primario btn--bloque" id="btn-agregar-detalle" data-agregar="${producto.id}">
        Agregar al carrito
      </button>
    </div>`;

  // 4. Evento del botón "Agregar al carrito".
  document.getElementById("btn-agregar-detalle").addEventListener("click", (evento) => {
    agregarAlCarrito(producto.id);
    avisarAgregado(evento.currentTarget);
  });
});
