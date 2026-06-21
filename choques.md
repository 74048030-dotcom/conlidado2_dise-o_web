# choques.md — Diagnóstico de choques de cascada (Paso 2)

> Proyecto **Raíz Verde** · Operación Bootstrap (S14)
> Auditoría de los conflictos entre `bootstrap.min.css` y nuestro `estilos.css`.
> Regla base: `estilos.css` se carga **después** de Bootstrap, por lo tanto **nuestro CSS gana** la cascada cuando la especificidad empata.

Probado en DevTools a **375 px**, **768 px** y **1024 px**.

| # | Elemento | Qué hace Bootstrap | Decisión | Cómo se resolvió |
|---|----------|--------------------|----------|------------------|
| 1 | `body` (tipografía y margen) | Impone su pila de fuentes del sistema y resetea `margin` | **Aceptado / neutralizado** | Nuestro `body { font-family: var(--fuente-texto) }` carga después → vuelve a Nunito Sans. El reset de márgenes es bienvenido. |
| 2 | Encabezados `h1–h3` | Reescala tamaños y `margin-bottom` | **Aceptado** | El tamaño final lo fija nuestra clase `.seccion__titulo`, `.banner__texto h1`, etc. (más específicas). |
| 3 | Enlaces `<a>` | Color azul `--bs-link-color` y subrayado | **Sobrescrito** | Mantenemos `a { color: inherit; text-decoration: none }` y, además, redefinimos `--bs-link-color` al verde de marca. |
| 4 | Listas `<ul>` del footer/menú | `padding-left` y viñetas por defecto | **Sobrescrito** | `.pie ul { list-style: none }` y la navbar usa `.navbar-nav` (sin viñetas). |
| 5 | Botones `.btn` | Bootstrap **también** define `.btn` | **Sobrescrito (ojo, colisión de nombres)** | Nuestras variantes `.btn--primario`, `.btn--claro`, `.btn--borde` cargan después y conservan el estilo de marca. `--bs-primary` se redefinió al verde por si se usa un `.btn-primary` puro. |
| 6 | Inputs / textarea / select | `.form-control` aplica su borde, alto y foco azul | **Sobrescrito** | Nuestras reglas `.campo input/textarea/select` y `.control input` cargan después → conservan el borde y el resplandor verde de Raíz Verde. |
| 7 | `.container` | Bootstrap fija sus `max-width` por breakpoint | **Aceptado** | Coincide casi con nuestro `--ancho-max: 1140px`; se usa el de Bootstrap en la navbar y el catálogo. |

## Resultado del checkpoint
- ✅ Sitio navegable en **375 / 768 / 1024 px** **sin scroll horizontal** y sin elementos rotos.
- ✅ Identidad visual (verde + terracota, tipografías Poppins/Nunito) intacta gracias al orden de los `<link>`.
- ✅ Mínimo de 3 choques documentados (aquí: 7) con su decisión.

> 💡 Cómo se identificó cada choque: clic derecho → **Inspeccionar** → panel **Styles**. Las reglas tachadas perdieron la cascada; la regla ganadora muestra su archivo de origen (`bootstrap.min.css` vs `estilos.css`).
