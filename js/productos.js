// ============================================================
//  Raíz Verde · Vivero Urbano
//  productos.js — MODELO DE DATOS (catálogo)
//  Los productos NO están codificados en el HTML: viven aquí
//  como un array de objetos y se pintan dinámicamente con JS.
//  Cada objeto tiene 6 propiedades (mínimo exigido: 4).
// ============================================================

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Monstera Deliciosa",
    precio: 45.90,
    imagen: "monstera.svg",
    categoria: "interior",
    descripcion: "La favorita de las casas modernas. Sus hojas perforadas crecen grandes y purifican el aire de interiores con luz indirecta."
  },
  {
    id: 2,
    nombre: "Pothos Dorado",
    precio: 22.50,
    imagen: "pothos.svg",
    categoria: "interior",
    descripcion: "Colgante, resistente y casi indestructible. Ideal para principiantes: tolera poca luz y riegos olvidados."
  },
  {
    id: 3,
    nombre: "Sansevieria (Lengua de Suegra)",
    precio: 35.00,
    imagen: "sansevieria.svg",
    categoria: "interior",
    descripcion: "Planta arquitectónica de hojas verticales. Filtra toxinas del aire y necesita muy poco mantenimiento."
  },
  {
    id: 4,
    nombre: "Helecho Boston",
    precio: 28.50,
    imagen: "helecho.svg",
    categoria: "interior",
    descripcion: "Follaje frondoso y elegante que ama la humedad. Perfecto para baños luminosos y rincones frescos."
  },
  {
    id: 5,
    nombre: "Cactus San Pedro",
    precio: 18.00,
    imagen: "cactus.svg",
    categoria: "suculentas",
    descripcion: "Cactus columnar de crecimiento vertical. Requiere sol pleno y riego mínimo: la opción más resistente del vivero."
  },
  {
    id: 6,
    nombre: "Echeveria Rosa",
    precio: 12.90,
    imagen: "echeveria.svg",
    categoria: "suculentas",
    descripcion: "Suculenta en roseta con tonos pastel. Pequeña, decorativa y perfecta para escritorios y centros de mesa."
  },
  {
    id: 7,
    nombre: "Lavanda Aromática",
    precio: 24.00,
    imagen: "lavanda.svg",
    categoria: "exterior",
    descripcion: "Aromática de flores moradas que atrae polinizadores. Ideal para balcones soleados y jardines."
  },
  {
    id: 8,
    nombre: "Maceta de Cerámica",
    precio: 15.00,
    imagen: "maceta.svg",
    categoria: "accesorios",
    descripcion: "Maceta artesanal de cerámica esmaltada con plato incluido. Drenaje inferior para raíces sanas."
  },
  {
    id: 9,
    nombre: "Sustrato Premium 5 kg",
    precio: 19.90,
    imagen: "sustrato.svg",
    categoria: "accesorios",
    descripcion: "Mezcla aireada con fibra de coco y humus. Mejora el drenaje y aporta nutrientes a tus plantas."
  }
];

// Busca un producto por su id (lo reutilizan la vista de detalle y el carrito).
function buscarProductoPorId(id) {
  return PRODUCTOS.find(producto => producto.id === Number(id));
}
