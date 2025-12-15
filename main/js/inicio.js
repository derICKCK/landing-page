/**Funcion para ocultar los contendios del cuerpo hasta que se deslice abajo */
const elementos = document.querySelectorAll(".oculto");
//funcion1
function mostrar() {
  const elementos = document.querySelectorAll(".oculto"); // se ejecuta cada vez que haces scroll
  elementos.forEach(elem => {
    const top = elem.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      elem.classList.add("visible");
    }
  });
}

//Boton para empezar
document.getElementById("boton").addEventListener("click", () => {
  document.getElementById("redireccion").scrollIntoView({
    behavior: "smooth"
  });
});



/**Funcion para ir al inicio al hacer click en el logo */
//Funcion 2
function irAlInicio() {
    window.location.href = "index.html"; 
}

document.getElementById("milogo").addEventListener("click", irAlInicio);


/*Funcion para ir al inicio al hacer click en el logo pero del footer 
funcion 3*/

function iralprincipio() {
    window.location.href = "index.html"; 
}

document.getElementById("milogoo").addEventListener("click", iralprincipio);
// Array
const servicios = [
  {
    titulo: "Equipo",
    descripcion: "Grabación con dispositivo móvil adaptados a tu estilo."
  },
  {
    titulo: "Programas de Edición",
    descripcion: "Edición enfocada en impacto visual y viralidad."
  },
  {
    //
    titulo: "Gestion de redes Social",
    //Usamos un array para listar los servicios de descripcion y luego usar un join
    descripcion: ["Optimización para TikTok","Reels","Shorts"]
  }
];
  //<Seleccionar de html un id
const contenedorServicios = document.getElementById("servicios");
  /*Funcion para mostrar los servicios en cartas

  Funcion 4*/

function mostrarServicios() {
  servicios.forEach(servicio => {
    const card = document.createElement("div");
    card.classList.add("card", "oculto");

    card.innerHTML = `
      <h3>${servicio.titulo}</h3>
      <p>${
        Array.isArray(servicio.descripcion)
          ? servicio.descripcion.join(", ")
          : servicio.descripcion
      }</p>
    `;

    contenedorServicios.appendChild(card);
  });
}
// Crear cards
mostrarServicios(); 
// Mostrar las que ya están en pantalla 
mostrar();          
 // Animación al hacer scroll 
window.addEventListener("scroll", mostrar);