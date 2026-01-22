/* =========================
   LOGOS → VOLVER A INICIO
========================= */
function irAlInicio() {
  window.location.href = "/";
}

const logoNav = document.getElementById("logo_nav");
const logoFooter = document.getElementById("logo_pie");

if (logoNav) logoNav.addEventListener("click", irAlInicio);
if (logoFooter) logoFooter.addEventListener("click", irAlInicio);

/* =========================
   FORMULARIO CONTACTO
========================= */
const form = document.getElementById("form-contacto");
const estado = document.getElementById("mensaje-estado");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🔴 evita que cambie de página

    const datos = {
      nombre: form.nombre.value,
      email: form.email.value,
      mensaje: form.mensaje.value
    };

    try {
      const res = await fetch("/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });

      const texto = await res.text();

      estado.textContent = texto;
      estado.style.color = "green";
      form.reset();

    } catch (error) {
      estado.textContent = "Error al enviar el mensaje";
      estado.style.color = "red";
    }
  });
}
