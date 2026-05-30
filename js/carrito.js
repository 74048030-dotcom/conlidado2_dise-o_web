// ============================================================
//  Raíz Verde · carrito.js
//  Lógica del carrito de compras compartida por TODAS las páginas.
//  Persiste en localStorage para que no se pierda al navegar o
//  recargar. El contador del ícono se actualiza en todo momento.
// ============================================================

// Clave única bajo la que guardamos el carrito en el navegador.
const CLAVE_CARRITO = "raizverde_carrito";

// ------------------------------------------------------------
//  LECTURA / ESCRITURA EN localStorage
//  El carrito es un array de objetos { id, cantidad }.
// ------------------------------------------------------------
function obtenerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  // Si no hay nada guardado o el JSON está corrupto, devolvemos un array vacío.
  try {
    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    console.warn("Carrito corrupto, se reinicia.", error);
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito(); // mantener el ícono sincronizado
}

// ------------------------------------------------------------
//  OPERACIONES DEL CARRITO
// ------------------------------------------------------------

// Agrega una unidad de un producto (o aumenta su cantidad si ya existe).
function agregarAlCarrito(id) {
  const carrito = obtenerCarrito();
  const linea = carrito.find(item => item.id === Number(id));

  if (linea) {
    linea.cantidad += 1;
  } else {
    carrito.push({ id: Number(id), cantidad: 1 });
  }

  guardarCarrito(carrito);
}

// Cambia la cantidad de un producto. Si baja a 0 o menos, lo elimina.
function actualizarCantidad(id, cantidad) {
  let carrito = obtenerCarrito();
  const linea = carrito.find(item => item.id === Number(id));
  if (!linea) return;

  linea.cantidad = Number(cantidad);
  if (linea.cantidad <= 0) {
    carrito = carrito.filter(item => item.id !== Number(id));
  }
  guardarCarrito(carrito);
}

// Elimina por completo un producto del carrito.
function eliminarDelCarrito(id) {
  const carrito = obtenerCarrito().filter(item => item.id !== Number(id));
  guardarCarrito(carrito);
}

// Vacía todo el carrito.
function vaciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
  actualizarContadorCarrito();
}

// ------------------------------------------------------------
//  CÁLCULOS
// ------------------------------------------------------------

// Suma total de unidades (para el contador del ícono).
function contarItems() {
  return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

// Calcula subtotal de cada línea y el total general.
// Devuelve { lineas: [...], total } combinando carrito + datos del producto.
function calcularTotales() {
  const carrito = obtenerCarrito();
  let total = 0;

  const lineas = carrito.map(item => {
    const producto = buscarProductoPorId(item.id);
    const subtotal = producto ? producto.precio * item.cantidad : 0;
    total += subtotal;
    return { ...producto, cantidad: item.cantidad, subtotal };
  });

  return { lineas, total };
}

// ------------------------------------------------------------
//  CONTADOR DEL ÍCONO (badge en el header de cada página)
// ------------------------------------------------------------
function actualizarContadorCarrito() {
  const badge = document.getElementById("contador-carrito");
  if (!badge) return; // por si alguna página no tuviera el ícono

  const cantidad = contarItems();
  badge.textContent = cantidad;
  // El badge solo se ve si hay algo en el carrito.
  badge.classList.toggle("oculto", cantidad === 0);
}

// Al cargar cualquier página, sincronizamos el contador con localStorage.
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
