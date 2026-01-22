const contenedor = document.getElementById("listaServicios");
const contenedorCarrito = document.getElementById("carrito");

let carrito = [];

// ================== CARGAR SERVICIOS ==================
async function cargarServicios() {
  try {
    const res = await fetch("/api/servicios");
    if (!res.ok) throw new Error("API no disponible");
    const servicios = await res.json();
    renderServicios(servicios);
  } catch (error) {
    console.warn("Usando JSON local");
    const res = await fetch("/data/servicios.json");
    const servicios = await res.json();
    renderServicios(servicios);
  }
}

// ================== RENDER SERVICIOS ==================
function renderServicios(servicios) {
  contenedor.innerHTML = servicios.map(servicio => `
    <article class="card-servicio">
      <img src="${servicio.imagen}" alt="${servicio.titulo}">
      <h2>${servicio.titulo}</h2>
      <p>${servicio.descripcion}</p>
      <p><strong>${servicio.precio} €</strong></p>
      <button class="btn-add" data-id="${servicio.id}">
        Añadir al carrito
      </button>
    </article>
  `).join("");
}

// ================== CARRITO ==================
function añadirCarrito(id) {
  const producto = carrito.find(p => p.id === id);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ id, cantidad: 1 });
  }

  renderCarrito();
}

// ================== RENDER CARRITO ==================
function renderCarrito() {
  if (!contenedorCarrito) return;

  contenedorCarrito.innerHTML = carrito.map(item => `
    <li>
      Servicio ID ${item.id} — Cantidad: ${item.cantidad}
    </li>
  `).join("");
}

// ================== EVENTOS ==================
contenedor.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-add")) return;

  const id = parseInt(e.target.dataset.id);
  añadirCarrito(id);
});

// ================== INICIO ==================
cargarServicios();
