import {usuario} from './class.js'

document.addEventListener("DOMContentLoaded", () => {
  const adminLoggedIn = localStorage.getItem('adminLogged') === 'true';
  const invitadoLoggedIn = localStorage.getItem('invitadoLogged') === 'true';

  if(adminLoggedIn || invitadoLoggedIn){
    window.location.href = '../index.html';
  }

  const usernameRequired =
    "Ingrese una dirección de correo electrónico válida, número de teléfono o nombre de Skype.";
  const passwordRequired = "Ingrese la contraseña de su cuenta de Microsoft.";
  const userNotExist = "No se ha encontrado usuario con las credenciales que ingresó"
  const usernameInput = document.getElementById("input_username");
  const passwordInput = document.getElementById("input_password");
  let view = "username";

  let isUsernameValid = false;
  let isPasswordValid = false;

  const displayErrorMessage = (errorElem, message, inputElem) => {
    errorElem.innerText = message;
    inputElem.classList.add("error-inp");
  };

  const clearErrorMessage = (errorElem, inputElem) => {
    errorElem.innerText = "";
    inputElem.classList.remove("error-inp");
  };

  const validateUsername = () => {
    const trimmedValue = usernameInput.value.trim();
    if (trimmedValue === "") {
      displayErrorMessage(
        document.getElementById("error_username"),
        usernameRequired,
        usernameInput
      );
      isUsernameValid = false;
    } else {
      clearErrorMessage(
        document.getElementById("error_username"),
        usernameInput
      );
      isUsernameValid = true;
    }
  };

  const validatePassword = () => {
    const trimmedValue = passwordInput.value.trim();
    if (trimmedValue === "") {
      displayErrorMessage(
        document.getElementById("error_password"),
        passwordRequired,
        passwordInput
      );
      isPasswordValid = false;
    } else {
      clearErrorMessage(
        document.getElementById("error_password"),
        passwordInput
      );
      isPasswordValid = true;
    }
  };

  const toggleSections = (hideId, showId) => {
    document.getElementById(hideId).classList.add("d-none");
    document.getElementById(showId).classList.remove("d-none");
  };

  const onNextButtonClick = () => {
    if (view === "username") {
      validateUsername();
      if (isUsernameValid) {
        toggleSections("section_uname", "section_pwd");
        document.querySelectorAll("#user_identity").forEach((e) => {
          e.innerText = usernameInput.value;
        });
        view = "password";
      }
    }
  };

  const onSignInButtonClick = () => {
    if (view === "password") {
      validatePassword();
  
      if (isPasswordValid) {
        const username = usernameInput.value;

        for (let i = 0; i < localStorage.length; i++) {
          const storedUserData = JSON.parse(localStorage.getItem(localStorage.key(i)));
  
          if (storedUserData && storedUserData.email === username && storedUserData.contraseña === passwordInput.value) {
            const storedUser = new usuario(
              storedUserData.email,
              storedUserData.contraseña,
              storedUserData.rol
            );
  
            if (storedUser.getRol() === "admin") {
              localStorage.setItem('adminLogged', 'true');
              window.location.href = "../pages/administrador.html";
            } else if (storedUser.getRol() === "invitado") {
              localStorage.setItem('invitadoLogged', 'true');
              window.location.href = "../index.html";
            }
  
            return;
          }
        }
  
        displayErrorMessage(
          document.getElementById("error_password"),
          userNotExist,
          passwordInput
        );
      }
    }
  };

  const onBackButtonClick = () => {
    view = "username";
    toggleSections("section_pwd", "section_uname");
  };

  document
    .getElementById("btn_next")
    .addEventListener("click", onNextButtonClick);
  document
    .getElementById("btn_sig")
    .addEventListener("click", onSignInButtonClick);
  document.querySelector(".back").addEventListener("click", onBackButtonClick);
});
