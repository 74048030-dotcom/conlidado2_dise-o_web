# veredicto.md — El veredicto técnico (Paso 6)

> Proyecto **Raíz Verde · Vivero Urbano** — Operación Bootstrap (S14)
> Comparación entre la versión **S13 (CSS puro)** y la versión **S14 (Bootstrap 5.3.8)**.
>
> 🔖 La versión **S13** se conserva intacta en la rama **`main`**; esta versión (S14) vive en la rama **`bootstrap`**. El historial de git es nuestra "copia de seguridad".

## Tabla comparativa (página `index.html`)

| Métrica | S13 (CSS puro) | S14 (Bootstrap) |
|---|---|---|
| **KB transferidos al cargar index** | ≈ **40 KB** (HTML + estilos.css + 4 JS + SVGs + Google Fonts) | ≈ **94 KB** (lo anterior **+ Bootstrap CSS ~31 KB gzip + bundle JS ~23 KB gzip**) |
| **N.° de requests** | ≈ **12** (sin contar las woff2 de Google Fonts) | ≈ **14** (+ `bootstrap.min.css` + `bootstrap.bundle.min.js`) |
| **Líneas de CSS propio (activas)** | **315** | **298** (tras comentar la cabecera y el grid migrados; se añadió ~18 líneas de CSS "puente") |
| **Tiempo invertido en hacerlo responsive** | ~90 min (sesión S13: media queries a mano) | ~70 min (sesión de hoy: clases utilitarias) |

> ⚠️ Los KB y requests son valores derivados de los archivos del proyecto + los tamaños **gzip** oficiales del CDN de Bootstrap 5.3.8. Confírmenlos en su equipo con **DevTools → Network → Disable cache → recargar** (fila *transferred* / contador *requests*). Sin compresión, Bootstrap pesa ~232 KB (CSS) + ~80 KB (JS).

## Veredicto del equipo

Para **este** proyecto recomendamos un enfoque **híbrido**, y si hubiera que elegir uno solo, **mantener el CSS propio como base** apoyándonos en Bootstrap solo para componentes con lógica (navbar) y el grid.

Las cifras lo justifican: migrar a Bootstrap **no redujo nuestro CSS** de forma significativa (de **315 a 298 líneas activas**, apenas −17), porque Raíz Verde tiene una **identidad visual fuerte** —paleta verde/terracota, tarjetas, banner animado— que igual hay que escribir a mano. En cambio, el costo de descarga **sí subió de forma notable** (de ~40 KB a ~94 KB y +2 requests), peso que pagaría cada visitante en cada carga sin caché.

Donde Bootstrap **sí ganó claramente** fue en la **navbar**: reemplazó un menú artesanal sin colapso real por un componente con `collapse` animado, atributos `aria-*` y **navegación por teclado** (Tab) que antes no teníamos. Ese es un beneficio de **accesibilidad y mantenibilidad** que no se mide en KB y que por sí solo justifica la integración.

Consideraciones **no medibles**: a favor de Bootstrap, la **curva de aprendizaje** baja y el equipo entrega más rápido (utilidades `col-*`, `g-4`, `form-control`); en contra, suma una **dependencia de terceros** (CDN externo) y obliga a vigilar la **cascada** para no perder la **identidad visual**.

**Conclusión:** Bootstrap es la herramienta correcta para la **navbar, el grid y los formularios** (zonas estructurales y repetitivas), pero **no** para reemplazar nuestra hoja de marca. El veredicto se apoya en dos métricas (líneas de CSS casi iguales + peso de descarga mayor) y en un criterio cualitativo (accesibilidad/mantenibilidad de la navbar).

— *Equipo Raíz Verde, Diseño Web NRC 33061*
