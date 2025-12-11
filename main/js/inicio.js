const elementos = document.querySelectorAll(".oculto");

function mostrar() {
  elementos.forEach(elem => {
    const top = elem.getBoundingClientRect().top;
    if (top < window.innerHeight -100) {
      elem.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", mostrar);


function irAlInicio() {
    window.location.href = "index.html"; 
}

document.getElementById("milogo").addEventListener("click", irAlInicio);




function iralprincipio() {
    window.location.href = "index.html"; 
}

document.getElementById("milogoo").addEventListener("click", iralprincipio);

