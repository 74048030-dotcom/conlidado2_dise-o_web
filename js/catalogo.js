// ============================================================
//  Raíz Verde · catalogo.js
//  Pinta el catálogo completo y aplica búsqueda + filtro por
//  categoría. Demuestra eventos: input, change y click.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const grid        = document.getElementById("grid-catalogo");
  const inputBuscar = document.getElementById("buscar");
  const selectCat   = document.getElementById("filtro-categoria");
  const conteo      = document.getElementById("conteo");
  if (!grid) return;

  // --- Poblar el <select> de categorías a partir de los datos (Set) ---
  const categorias = [...new Set(PRODUCTOS.map(p => p.categoria))].sort();
  categorias.forEach(cat => {
    const op = document.createElement("option");
    op.value = cat;
    op.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    selectCat.appendChild(op);
  });

  // --- Filtra según texto + categoría y vuelve a pintar ---
  function aplicarFiltros() {
    const texto = inputBuscar.value.trim().toLowerCase();
    const cat   = selectCat.value;

    const visibles = PRODUCTOS.filter(p => {
      const coincideTexto = texto === "" ||
        p.nombre.toLowerCase().includes(texto) ||
        p.descripcion.toLowerCase().includes(texto);
      const coincideCat = cat === "" || p.categoria === cat;
      return coincideTexto && coincideCat;
    });

    pintar(visibles);
  }

  // --- Dibuja la lista (o un mensaje si está vacía) ---
  function pintar(lista) {
    conteo.textContent = `${lista.length} producto${lista.length === 1 ? "" : "s"}`;
    if (lista.length === 0) {
      // col-12 para ocupar toda la fila del grid de Bootstrap.
      grid.innerHTML = `
        <div class="col-12">
          <div class="sin-resultados">
            <strong>Sin coincidencias</strong>
            Prueba con otra palabra o cambia la categoría.
          </div>
        </div>`;
      return;
    }
    // Cada tarjeta dentro de su columna: 1 / 2 / 3 por fila según breakpoint.
    grid.innerHTML = lista
      .map(p => `<div class="col-12 col-md-6 col-lg-4">${crearTarjetaProducto(p)}</div>`)
      .join("");
  }

  // --- EVENTOS ---
  inputBuscar.addEventListener("input", aplicarFiltros);   // búsqueda en vivo
  selectCat.addEventListener("change", aplicarFiltros);    // filtro por categoría

  // Delegación de clics para los botones "Agregar" de las tarjetas.
  grid.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-agregar]");
    if (!boton) return;
    agregarAlCarrito(boton.dataset.agregar);
    avisarAgregado(boton);
  });

  // Render inicial con todos los productos.
  aplicarFiltros();
});
