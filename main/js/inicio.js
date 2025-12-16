/* ===================== */
/* BOTÓN "EMPEZAR"       */
/* ===================== */
const boton = document.getElementById("boton");
const seccionRedireccion = document.getElementById("redireccion");

if (boton && seccionRedireccion) {
  boton.addEventListener("click", () => {
    seccionRedireccion.scrollIntoView({ behavior: "smooth" });
  });
}

/* ===================== */
/* LOGO → IR AL INICIO   */
/* ===================== */
function irAlInicio() {
  window.location.href = "index.html";
}

const logonav = document.getElementById("logo_nav");
const logopie = document.getElementById("logo_pie");

if (logonav) logonav.addEventListener("click", irAlInicio);
if (logopie) logopie.addEventListener("click", irAlInicio);

/* ===================== */
/* SERVICIOS / CARDS     */
/* ===================== */
const servicios = [
  {
    titulo: "Equipo",
    descripcion: "Grabaciones usando mi iPhone de última generación y un trípode estable. Cada toma está adaptada a tu estilo para que tu contenido destaque en redes sociales.",
    imagen: "../imagen/tripode.jpeg"
  },
  {
    titulo: "Programa de Edición",
    descripcion: "Edición viral con CapCut, enfocada en crear videos con impacto visual y alto potencial de viralidad. Transformo tus ideas en contenido que captura la atención de tu audiencia.",
    imagen: "../imagen/capcut.jpeg"
  },
  {
    titulo: "Gestión de Redes Sociales",
    descripcion: "Optimización de TikTok, Reels y Shorts, aplicando estrategias basadas en el funcionamiento de los algoritmos para maximizar alcance y engagement.",
    imagen: "../imagen/instagram.jpg"
  }
];

const contenedorServicios = document.getElementById("servicios");

/* ===================== */
/* INTERSECTION OBSERVER */
/* ===================== */
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

/* ===================== */
/* CREAR DOM             */
/* ===================== */
function mostrarServicios() {
  if (!contenedorServicios) return;

  servicios.forEach(servicio => {
    const card = document.createElement("div");
    card.classList.add("card", "oculto");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${servicio.imagen}" alt="${servicio.titulo}">
          <h3>${servicio.titulo}</h3>
        </div>
        <div class="card-back">
          <p>${servicio.descripcion}</p>
        </div>
      </div>
    `;

    contenedorServicios.appendChild(card);
    observer.observe(card);
  });
}

/* ===================== */
/* INICIO                */
/* ===================== */
mostrarServicios();
