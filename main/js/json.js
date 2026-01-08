const servicios = [
  {
    imagen: "../imagen/icono-camara.svg",
    titulo: "Grabación de cámara",
    descripcion: "Grabación de vídeos para redes, enfocado en marcas, empresas y proyectos personales."
  },
  {
    imagen: "../imagen/icono-edicion.svg",
    titulo: "Edición",
    descripcion: "Edición dinámica, diseño de sonido y efectos visuales para un video viral."
  },
  {
    imagen: "../imagen/icono-redes.svg",
    titulo: "Gestión de Redes Sociales",
    descripcion: "Gestión diaria enfocada en el algoritmo para aumentar visibilidad."
  }
];

const contenedor = document.getElementById("listaServicios");

contenedor.innerHTML = servicios.map(servicio => `
  <article class="card-servicio">
    <img src="${servicio.imagen}" alt="${servicio.titulo}">
    <h2>${servicio.titulo}</h2>
    <p>${servicio.descripcion}</p>
    <a href="contacto.html" class="btn-servicio">Más info</a>
  </article>
`).join("");
