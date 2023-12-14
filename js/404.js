document.addEventListener("DOMContentLoaded", () => {
    const adminLoggedIn = localStorage.getItem('adminLogged') === 'true';
    const invitadoLoggedIn = localStorage.getItem('invitadoLogged') === 'true';

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
})