/* =========================
   ANIMACIÓN SCROLL
========================= */
function mostrarElementos() {
  const elementos = document.querySelectorAll(".oculto");

  elementos.forEach(elem => {
    const top = elem.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      elem.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", mostrarElementos);

/* =========================
   BOTÓN "EMPEZAR"
========================= */
const boton = document.getElementById("boton");
const seccionRedireccion = document.getElementById("redireccion");

if (boton && seccionRedireccion) {
  boton.addEventListener("click", () => {
    seccionRedireccion.scrollIntoView({ behavior: "smooth" });
  });
}

/* =========================
   LOGO → IR AL INICIO
========================= */
function irAlInicio() {
  window.location.href = "index.html";
}

const logoHeader = document.getElementById("milogo");
const logoFooter = document.getElementById("milogoo");

if (logoHeader) logoHeader.addEventListener("click", irAlInicio);
if (logoFooter) logoFooter.addEventListener("click", irAlInicio);

/* =========================
   SERVICIOS / CARDS
========================= */
const servicios = [
  {
    titulo: "Equipo",
    descripcion: "Grabación con dispositivo móvil adaptada a tu estilo.",
    imagen: "../imagen/tripode.png"
  },
  {
    titulo: "Programas de Edición",
    descripcion: "Edición enfocada en impacto visual y viralidad.",
    imagen: "../imagen/Hugo.jpeg"
  },
  {
    titulo: "Gestión de Redes Sociales",
    descripcion: ["Optimización para TikTok", "Reels", "Shorts"],
    imagen: "../imagen/redes.png"
  }
];

const contenedorServicios = document.getElementById("servicios");

function mostrarServicios() {
  if (!contenedorServicios) return;

  servicios.forEach(servicio => {
    const card = document.createElement("div");
    card.classList.add("card", "oculto");

    const descripcion = Array.isArray(servicio.descripcion)
      ? servicio.descripcion.join(", ")
      : servicio.descripcion;

    card.innerHTML = `
      <h3>${servicio.titulo}</h3>
      <p>${descripcion}</p>
    `;

    contenedorServicios.appendChild(card);
  });
}

/* =========================
   INICIALIZACIÓN
========================= */
mostrarServicios();
mostrarElementos();
