// ===== CARRITO =====

// Leer carrito de localStorage o crear uno vacío

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Actualizar contador del carrito
function actualizarContador() {
  const contador = document.getElementById("contadorCarrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
}

// Añadir servicio al carrito
function añadirAlCarrito(servicio) {
  carrito.push(servicio);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

// ===== SERVICIOS =====

const contenedor = document.getElementById("listaServicios");

async function cargarServicios() {
  try {
    const res = await fetch("/api/servicios");
    const servicios = await res.json();

    contenedor.innerHTML = servicios.map(servicio => `
      <article class="card-servicio">
        <h2>${servicio.nombre}</h2>
        <p>${servicio.descripcion}</p>
        <p><strong>${servicio.precio} €</strong></p>
        <button class="btn-servicio" data-id="${servicio.id}">
          Añadir al carrito
        </button>
      </article>
    `).join("");

    // Eventos de los botones
    document.querySelectorAll(".btn-servicio").forEach(btn => {
      btn.addEventListener("click", () => {
        const servicioElegido = servicios.find(
          s => s.id == btn.dataset.id
        );
        añadirAlCarrito(servicioElegido);
      });
    });

  } catch (error) {
    console.error("Error cargando servicios:", error);
  }
}

cargarServicios();
actualizarContador();
