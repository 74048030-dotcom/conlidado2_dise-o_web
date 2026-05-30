// ============================================================
//  Raíz Verde · utiles.js
//  Funciones de apoyo reutilizadas por todas las páginas.
// ============================================================

// Hay páginas en la raíz (index.html) y dentro de /pages.
// Estos ayudantes hacen que las rutas funcionen desde ambos lugares.
const EN_PAGES = window.location.pathname.includes("/pages/");
const RUTA_BASE = EN_PAGES ? "../" : "";

// Ruta a una imagen de /img válida desde la página actual.
function rutaImagen(archivo) {
  return RUTA_BASE + "img/" + archivo;
}

// Ruta a una página de /pages válida desde la página actual.
function rutaPagina(archivo) {
  return EN_PAGES ? archivo : "pages/" + archivo;
}

// Formatea un número como precio en soles (S/).
function formatearPrecio(valor) {
  return "S/ " + valor.toFixed(2);
}

// ------------------------------------------------------------
//  Genera el HTML de una tarjeta de producto.
//  Se reutiliza en la Home (destacados) y en el Catálogo.
// ------------------------------------------------------------
function crearTarjetaProducto(producto) {
  return `
    <article class="tarjeta">
      <a href="${rutaPagina("detalle.html")}?id=${producto.id}">
        <img class="tarjeta__img" src="${rutaImagen(producto.imagen)}" alt="${producto.nombre}">
      </a>
      <div class="tarjeta__cuerpo">
        <span class="tarjeta__categoria">${producto.categoria}</span>
        <h3 class="tarjeta__nombre">${producto.nombre}</h3>
        <span class="tarjeta__precio">${formatearPrecio(producto.precio)}</span>
        <div class="tarjeta__acciones">
          <a class="btn btn--borde" href="${rutaPagina("detalle.html")}?id=${producto.id}">Ver</a>
          <button class="btn btn--primario" data-agregar="${producto.id}">Agregar</button>
        </div>
      </div>
    </article>`;
}

// Retroalimentación visual breve al pulsar "Agregar".
function avisarAgregado(boton) {
  const textoOriginal = boton.textContent;
  boton.textContent = "✓ Agregado";
  boton.disabled = true;
  setTimeout(() => {
    boton.textContent = textoOriginal;
    boton.disabled = false;
  }, 1000);
}
