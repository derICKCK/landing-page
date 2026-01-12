const contenedor = document.getElementById("listaServicios");

async function cargarServicios() {
  try {
    const res = await fetch('../data/products.json');
    const servicios = await res.json();

    contenedor.innerHTML = servicios.map(servicio => `
      <article class="card-servicio">
        <img src="${servicio.imagen}" alt="${servicio.titulo}">
        <h2>${servicio.titulo}</h2>
        <p>${servicio.descripcion}</p>
        <a href="contacto.html" class="btn-servicio">Más info</a>
      </article>
    `).join("");

  } catch (error) {
    console.error("Error cargando JSON:", error);
  }
}

cargarServicios();
