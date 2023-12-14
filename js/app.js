document.addEventListener("DOMContentLoaded", () => {
  const adminLoggedIn = localStorage.getItem("adminLogged") === "true";
  const invitadoLoggedIn = localStorage.getItem("invitadoLogged") === "true";

  const navbar = document.querySelector(".navbar-collapse");
  if (navbar) {
    if (adminLoggedIn) {
      const logoutAdminButton = document.createElement("button");
      logoutAdminButton.classList.add("btn", "btn-danger", "ms-auto");
      logoutAdminButton.textContent = "Cerrar Sesión";

      logoutAdminButton.addEventListener("click", () => {
        localStorage.removeItem("adminLogged");
        window.location.href = "../index.html";
      });

      navbar.appendChild(logoutAdminButton);
    }

    if (invitadoLoggedIn) {
      const logoutInvitadoButton = document.createElement("button");
      logoutInvitadoButton.classList.add("btn", "btn-danger", "ms-auto");
      logoutInvitadoButton.textContent = "Cerrar Sesión";

      logoutInvitadoButton.addEventListener("click", () => {
        localStorage.removeItem("invitadoLogged");
        window.location.href = "../index.html";
      });

      navbar.appendChild(logoutInvitadoButton);
    }
  }
});

const getSize = () => {
  if (screen.width <= 500) {
    return 1;
  } else if (screen.width <= 750 && screen.width > 500) {
    return 2;
  } else if (screen.width <= 990 && screen.width > 750) {
    return 3;
  } else {
    return 4;
  }
};

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,
  grabCursor: true,
  slidesPerView: getSize(),
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const juegos = JSON.parse(localStorage.getItem("listado"));
const renderJuegos = () => {
  const contenedor = document.querySelector(".swiper-wrapper");
  if (!juegos.length) {
    contenedor.innerHTML = `<h2 class="display-3 text-center mx-auto">No hay juegos guardados</h2>`;
  }
  juegos?.map((juego) => {
    contenedor.innerHTML += `<div class="swiper-slide flex-column">
        <a href="${window.location.origin}/pages/detalleProducto.html?codigo=${juego.codigo}" class="game" class="juego">
        <img src="${juego.imagen}" alt="${juego.descripcion}" />
        <div class="card-body">
            <h3 class="card-title py-3 text-center">
                ${juego.titulo}    
            </h3>
        </div>
        </a>
    </div>`;
  });
};

const searchJuego = () => {
  const card = document.querySelector(".card");
  const nombre = document.getElementById("nombre").value;
  if (!nombre) {
    alert("Ingrese un nombre");
  }
  const juego = juegos.find((juego) =>
    juego.titulo.toUpperCase().includes(nombre.toUpperCase())
  );
  console.log(juego);
  card.innerHTML = `<div class="card">
    <a href="${window.location.origin}/pages/detalleProducto.html?codigo=${juego.codigo}" class="game">
    <img src="${juego.imagen}" alt="${juego.descripcion}" class="img-fluid"/>
    <div class="card-body">
        <h3 class="card-title py-3 text-center">
            ${juego.titulo}    
        </h3>
    </div>
    </a>
</div>`;
};
