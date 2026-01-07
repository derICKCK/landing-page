/*funcion1*/

/* BOTÓN "EMPEZAR"*/
const boton = document.getElementById("boton");
const seccionRedireccion = document.getElementById("redireccion");

/*Si exite funcionara */
if (boton && seccionRedireccion) {
  boton.addEventListener("click", () => { /*escucha el click*/
    seccionRedireccion.scrollIntoView({ behavior: "smooth" });  /*movimiento del boton hasta el elemento elegido co id*/ 
  });
}

/*Funcion 2*/

/* ir al inicio con el logo */
function irAlInicio() {
  window.location.href = "index.html";  
}

const logonav = document.getElementById("logo_nav");
const logopie = document.getElementById("logo_pie");

if (logonav) logonav.addEventListener("click", irAlInicio);
if (logopie) logopie.addEventListener("click", irAlInicio);/*Si haces click a los elementos te redireciona */

  /*Funcion 3 + array*/
/* SERVICIOS / CARDS  */
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

/* INTERSECTION OBSERVER */
const observer = new IntersectionObserver( /* Observa cunado las tarjtas entran en pantalla */

  (entries, obs) => { /*contener elementos con entries y observar elementos con obs */

    entries.forEach(entry => { /*Comprueba si entra un elemento= funcion flecha  */

      if (entry.isIntersecting) {/*Mira si el elemento ya esta en pantalla ture/ false */

        entry.target.classList.add("visible"); /*Le añades una clase al elmento observado  */

        obs.unobserve(entry.target);/*Dejar de observar el elemento del dom*/
      }
    });
  },
);

/* CREAR DOM */
function mostrarServicios() {
  if (!contenedorServicios) return;

  /* bucle for */
  for (let i = 0; i < servicios.length; i++) {
    console.log("Servicio cargado:", servicios[i].titulo);
  }

  /* Array, join, indexar a html  */
  const cardsHTML = servicios.map(servicio => `
    <div class="card oculto">
      <div class="card-inner">
        <div class="card-front">
          <img src="${servicio.imagen}" alt="${servicio.titulo}">
          <h3>${servicio.titulo}</h3>
        </div>
        <div class="card-back">
          <p>${servicio.descripcion}</p>
        </div>
      </div>
    </div>
  `).join(" ");

  contenedorServicios.innerHTML = cardsHTML;

  /* OBSERVAR LAS CARDS */
  const cards = contenedorServicios.querySelectorAll(".card");
  cards.forEach(card => observer.observe(card));
}


/* INICIO */
mostrarServicios(); /*Ejecucion de función */

/*Fetch*/

async function cargarProductosJSON() {
  try {
    const res = await fetch("../data/products.json");
    const productos = await res.json();
    console.log("Productos desde JSON:", productos);
  } catch (error) {
    console.error("Error cargando JSON", error);
  }
}

cargarProductosJSON();
