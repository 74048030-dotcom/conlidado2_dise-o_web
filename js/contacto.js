// ============================================================
//  Raíz Verde · contacto.js
//  Formulario de pre-checkout con validación 100% en JavaScript
//  (no dependemos solo de atributos HTML5). Muestra mensajes de
//  error junto a cada campo y retroalimentación visual.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-checkout");
  if (!form) return;

  // Referencias a cada campo del formulario.
  const campos = {
    nombre:    form.nombre,
    email:     form.email,
    telefono:  form.telefono,
    direccion: form.direccion,
    fecha:     form.fecha,
    notas:     form.notas
  };

  // ----------------------------------------------------------
  //  Reglas de validación: cada una devuelve "" si es válido
  //  o un mensaje de error descriptivo si no lo es.
  // ----------------------------------------------------------
  const reglas = {
    nombre(valor) {
      if (valor.trim() === "") return "Ingresa tu nombre completo.";
      if (valor.trim().length < 3) return "El nombre debe tener al menos 3 caracteres.";
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor.trim())) return "El nombre solo puede contener letras.";
      return "";
    },
    email(valor) {
      if (valor.trim() === "") return "Ingresa tu correo electrónico.";
      // Patrón simple pero realista de email.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim())) return "El correo no tiene un formato válido (ej: nombre@correo.com).";
      return "";
    },
    telefono(valor) {
      if (valor.trim() === "") return "Ingresa un número de teléfono.";
      if (!/^\d{9}$/.test(valor.trim())) return "El teléfono debe tener exactamente 9 dígitos.";
      return "";
    },
    direccion(valor) {
      if (valor.trim() === "") return "Ingresa una dirección de entrega.";
      if (valor.trim().length < 6) return "La dirección parece muy corta.";
      return "";
    },
    fecha(valor) {
      if (valor === "") return "Elige una fecha de entrega.";
      // La fecha no puede ser anterior a hoy.
      const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
      if (new Date(valor) < hoy) return "La fecha no puede ser anterior a hoy.";
      return "";
    },
    notas() { return ""; } // campo opcional
  };

  // Valida un campo concreto y pinta su estado (error/valido).
  function validarCampo(nombre) {
    const campo = campos[nombre];
    const mensaje = reglas[nombre](campo.value);
    const grupo = campo.closest(".campo");
    const errorEl = grupo.querySelector(".campo__error");

    if (mensaje) {
      grupo.classList.add("error");
      grupo.classList.remove("valido");
      errorEl.textContent = mensaje;
      return false;
    }
    grupo.classList.remove("error");
    if (nombre !== "notas") grupo.classList.add("valido");
    errorEl.textContent = "";
    return true;
  }

  // Validación en vivo: al salir del campo (blur) y al escribir si ya hay error.
  Object.keys(campos).forEach(nombre => {
    campos[nombre].addEventListener("blur", () => validarCampo(nombre));
    campos[nombre].addEventListener("input", () => {
      if (campos[nombre].closest(".campo").classList.contains("error")) {
        validarCampo(nombre);
      }
    });
  });

  // ----------------------------------------------------------
  //  Envío del formulario (evento submit).
  // ----------------------------------------------------------
  form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // evitamos la recarga para validar con JS

    // Validamos todos los campos y juntamos los resultados.
    const resultados = Object.keys(campos).map(validarCampo);
    const todoValido = resultados.every(Boolean);

    const aviso = document.getElementById("aviso");

    if (!todoValido) {
      aviso.innerHTML = "";
      // Llevamos el foco al primer campo con error.
      form.querySelector(".campo.error input, .campo.error textarea")?.focus();
      return;
    }

    // Éxito: mostramos confirmación, vaciamos el carrito y reseteamos.
    aviso.innerHTML = `
      <div class="aviso-exito">
        ✓ ¡Gracias, ${campos.nombre.value.trim()}! Tu pedido fue registrado.
        Te contactaremos al correo ${campos.email.value.trim()}.
      </div>`;
    vaciarCarrito();
    form.reset();
    form.querySelectorAll(".campo").forEach(c => c.classList.remove("valido", "error"));
    aviso.scrollIntoView({ behavior: "smooth" });
  });
});
