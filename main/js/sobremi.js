function irAlInicio() {
  window.location.href = "index.html";
}

const logoNav = document.getElementById("logo_nav");
const logoFooter = document.getElementById("logo_pie");

if (logoNav) logoNav.addEventListener("click", irAlInicio);
if (logoFooter) logoFooter.addEventListener("click", irAlInicio);
