// Contenedor donde se renderizan los servicios
const contenedor = document.getElementById("listaServicios");

// Cargar servicios desde la API
async function cargarServicios() {
  try {
    // 🔹 Llamada a la API REST
    const res = await fetch("/api/servicios");

    if (!res.ok) {
      throw new Error("Error en la API");
    }

    const servicios = await res.json();

    // 🔹 Render dinámico usando map + join
    contenedor.innerHTML = servicios.map(servicio => `
      <article class="card-servicio">
        <img src="${servicio.imagen}" alt="${servicio.titulo}">
        <h2>${servicio.titulo}</h2>
        <p>${servicio.descripcion}</p>
        <p><strong>${servicio.precio} €</strong></p>
        <a href="/contacto" class="btn-servicio">Más info</a>
      </article>
    `).join("");

  } catch (error) {
    console.error("Error cargando servicios:", error);
  }
}

// Ejecutar al cargar la página
cargarServicios();
