# CAMBIOS.md — Qué cambiamos al migrar de CSS puro a Bootstrap

> Proyecto **Raíz Verde · Vivero Urbano**
> Rama **`main`** = versión S13 (CSS puro)  ·  Rama **`bootstrap`** = versión S14 (Bootstrap 5.3.8)
> Este documento resume, zona por zona, **qué había antes (CSS propio)** y **qué hay ahora (Bootstrap)**.

---

## 0. Resumen en una línea
Integramos **Bootstrap 5.3.8 por CDN** y migramos **tres zonas** (navbar, catálogo/destacados y formulario) a sus componentes, **conservando** nuestra identidad visual (verde + terracota) gracias al orden de los `<link>`.

---

## 1. Conexión del framework (Paso 1)
**En las 5 páginas** (`index.html` + `pages/{catalogo,contacto,carrito,detalle}.html`):

- En el `<head>`, **antes** de `estilos.css`:
  ```html
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/estilos.css"> <!-- el nuestro, DESPUÉS -->
  ```
- Antes de cerrar `<body>`:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
  ```

**Por qué el orden importa:** `estilos.css` carga después → nuestras reglas ganan la cascada y Bootstrap no pisa la marca.

---

## 2. Navbar (Paso 3) — el cambio más grande

| Antes (CSS puro) | Ahora (Bootstrap) |
|---|---|
| `<header class="cabecera">` + `<ul class="menu">` | `<nav class="navbar navbar-expand-lg ...">` con `navbar-toggler` + `collapse` |
| Sticky y flex hechos a mano (`.cabecera`, `.cabecera__barra`) | `sticky-top` + `.container` de Bootstrap |
| En móvil el menú **solo encogía** (sin botón hamburguesa real) | Botón **☰** que despliega el menú con **animación** en `<992px` |
| **Sin** navegación por teclado | Navegable con **Tab** y con atributos `aria-*` incluidos |
| Estado activo con `.activo` | Estado activo con `.nav-link.active` + `aria-current="page"` |

- El `<header>` artesanal quedó **comentado** (no borrado) en cada HTML.
- **Se reutilizan** las clases `.marca` (logo + nombre) y `.carrito-icono` (badge `#contador-carrito`) dentro de la navbar, así el JS del carrito sigue funcionando sin tocarlo.
- En `estilos.css` se comentó el bloque `.cabecera` / `.menu` y se añadió una sección **"PUENTE BOOTSTRAP ↔ IDENTIDAD"** que re-viste los `.nav-link` con el look del menú original (verde, pill activo).

---

## 3. Catálogo y destacados (Paso 4) — del grid propio al de 12 columnas

| Antes (CSS puro) | Ahora (Bootstrap) |
|---|---|
| `.grid-productos { display:grid; auto-fill minmax(240px,1fr) }` | `row g-4` + columnas `col-*` |
| Columnas controladas por media queries | Catálogo: `col-12 col-md-6 col-lg-4` (1/2/3 por fila) · Destacados: `col-12 col-sm-6 col-lg-3` |
| Tarjeta `.tarjeta` | **La misma `.tarjeta`** (estilo propio intacto) dentro de su columna |

- Las tarjetas las genera JavaScript: en [js/utiles.js](js/utiles.js) `crearTarjetaProducto()` se mantiene igual, y **el envoltorio de columna** se añadió en [js/catalogo.js](js/catalogo.js) e [js/inicio.js](js/inicio.js).
- El mensaje "sin resultados" ahora va en un `col-12`.
- `.grid-productos` quedó **comentado** en el CSS (migrado). Se añadió `height:100%` a `.tarjeta` para igualar alturas dentro de cada fila del grid.

---

## 4. Formulario de contacto (Paso 5)

| Antes (CSS puro) | Ahora (Bootstrap) |
|---|---|
| `<form>` con `.campo` apilados | `<form class="row g-3">` con cada campo en una columna |
| Todo a una columna | Nombre/Email y Teléfono/Fecha **lado a lado** desde `md`; dirección, notas y botón a lo ancho (`col-12`) |
| `<label>` y `<input>` propios | `+ form-label` en labels y `+ form-control` en inputs/textarea |

- **Se conservaron** las clases `.campo` y `.campo__error` porque [js/contacto.js](js/contacto.js) valida sobre ellas → la validación 100% en JS sigue intacta.
- El estilo visual de los inputs (borde y resplandor verde) lo sigue poniendo nuestro CSS (gana la cascada); Bootstrap solo aporta la **rejilla responsive**.

---

## 5. Cambios en `estilos.css` (resumen)
- 🟢 **Añadido:** variables `--bs-primary` y `--bs-link-*` con el verde de marca (Desafío 4), sección "puente" para `.navbar`/`.nav-link`, `height:100%` en `.tarjeta`, `form.row .campo { margin-bottom:0 }`.
- 🟡 **Comentado (migrado, no borrado):** `.cabecera`, `.cabecera__barra`, `.menu`, `.menu a*`, `.grid-productos` y sus reglas dentro de las media queries.
- 🔵 **Intacto:** banner animado, botones de marca, tarjetas, carrito, detalle, footer y la paleta de `:root`.

---

## 6. Archivos tocados
| Archivo | Cambio |
|---|---|
| `index.html` | CDN + navbar + `row g-4` destacados + bundle |
| `pages/catalogo.html` | CDN + navbar + `row g-4` catálogo + bundle |
| `pages/contacto.html` | CDN + navbar + formulario en grid + bundle |
| `pages/carrito.html` | CDN + navbar + bundle |
| `pages/detalle.html` | CDN + navbar + bundle |
| `css/estilos.css` | Variables BS, CSS puente, reglas migradas comentadas |
| `js/inicio.js`, `js/catalogo.js` | Tarjetas envueltas en columnas del grid |

---

## 7. Lo que NO cambió (a propósito)
- Toda la lógica JS (carrito, validación, filtros, detalle) funciona **sin modificaciones de comportamiento**.
- La identidad visual de Raíz Verde: colores, tipografías, banner y tarjetas.
- La versión S13 sigue disponible y comparable en la rama `main`.

> 📊 Las métricas numéricas (KB, requests, líneas de CSS) y el veredicto técnico están en **[veredicto.md](veredicto.md)**; los conflictos de cascada, en **[choques.md](choques.md)**.
