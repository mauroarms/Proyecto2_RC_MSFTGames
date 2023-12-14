import Juego from "./class.js";

let listaDeJuegos = [];
const formularioDeJuegos = document.querySelector("#formAdministrarJuego");
const table = document.querySelector(".table tbody");

// Validaciones
const validarNombre = (nombre) => {
  if (!nombre) {
    return "El campo de nombre es obligatorio.";
  }


  if (nombre.length < 3 || nombre.length > 50) {
    return "El nombre debe tener entre 3 y 50 caracteres.";
  }

  return "Nombre se valido sin errores"
}

const validarDescripcion = (descripcion) => {
  if (!descripcion) {
    return "El campo de descripción es obligatorio.";
  }

  if (descripcion.length < 10 || descripcion.length > 500) {
    return "La descripción debe tener entre 10 y 500 caracteres.";
  }
  return "Descripcion se valido sin errores"
}

const validarImagen = (imagen) => {
  if (!imagen) {
    return "El campo de imagen es obligatorio.";
  }

// Hacer validacion con regex
return "Imagen se valido sin errores"
};

const validarGenero = (genero) => {
  if (!genero) {
    return "El campo de género es obligatorio.";
  }
  return "Genero se valido sin errores"
};

const validarCreador = (creador) => {
  if (!creador) {
    return "El campo de creador es obligatorio.";
  }


  if (creador.length < 3 || creador.length > 50) {
    return "El nombre del creador debe tener entre 3 y 50 caracteres.";
  }

  return "Creador se valido sin errores"
};

const validarLanzamiento = (lanzamiento) => {
  const fechaLanzamientoRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaLanzamientoRegex.test(lanzamiento)) {
    return "Formato de fecha de lanzamiento no válido. Utiliza el formato YYYY-MM-DD.";
  }

  return "Lanzamiento valido sin errores"
};

const validarEdadRequerida = (edad) => {
  if (!edad) {
    return "El campo de edad requerida es obligatorio.";
  }


  return "Edad se valido sin errores"
};
const validarPrecio = (precio) => {
  if (!precio) {
    return "El campo de precio es obligatorio.";
  }
  
  return "Precio se valido sin errores"
};

const crearJuego = (e) => {
  e.preventDefault();
  const nombreJuego = document.getElementById("titulo").value;
  const descripcionDelJuego = document.getElementById("descripcion").value;
  const imagenDelJuego = document.getElementById("imagen").value;
  const generoDelJuego = document.getElementById("selectGenero").value;
  const creadorDelJuego = document.getElementById("creador").value;
  const lanzamientoDelJuego = document.getElementById("lanzamiento").value;
  const edadRequeridaDelJuego = document.getElementById("selectEdad").value;
  const precioDelJuego = document.getElementById("precio").value


  const errorNombre = validarNombre(nombreJuego);
  const errorDescripcion = validarDescripcion(descripcionDelJuego);
  const errorImagen = validarImagen(imagenDelJuego);
  const errorGenero = validarGenero(generoDelJuego);
  const errorCreador = validarCreador(creadorDelJuego);
  const errorLanzamiento = validarLanzamiento(lanzamientoDelJuego);
  const errorEdadRequerida = validarEdadRequerida(edadRequeridaDelJuego);
  const errorPrecio = validarPrecio(precioDelJuego);


  if (errorNombre || errorDescripcion || errorImagen || errorGenero || errorCreador || errorLanzamiento || errorEdadRequerida) {

    console.error("Error en la validación:", errorNombre, errorDescripcion, errorImagen, errorGenero, errorCreador, errorLanzamiento, errorEdadRequerida, errorPrecio);
 
  }

  const juegoNuevo = new Juego(
    undefined,
    nombreJuego,
    descripcionDelJuego,
    imagenDelJuego,
    generoDelJuego,
    creadorDelJuego,
    lanzamientoDelJuego,
    edadRequeridaDelJuego,
    precioDelJuego
  );

  listaDeJuegos.push(juegoNuevo);
  guardarLocalStorage();
  renderizarTabla();
  formularioDeJuegos.reset();
};

export const añadirJuego = (juegoNuevo) => {
  const fila = document.createElement("tr");

  fila.innerHTML = `
    <th scope="row">${table.rows.length + 1}</th>
    <td>${juegoNuevo.getTitulo()}</td>
    <td class="text-truncate" style="max-width: 250px;">${juegoNuevo.getDescripcion()}</td>
    <td class="text-center"> <img src=${juegoNuevo.getImagen()} height="150" width="150"></td>
    <td>${juegoNuevo.getGenero()}</td>
    <td>${juegoNuevo.getCreador()}</td>
    <td>${juegoNuevo.getLanzamiento()}</td>
    <td>${juegoNuevo.getEdad()}</td>
    <td>$ ${juegoNuevo.getPrecio()}</td>
    <td>
        <div class="d-flex gap-3">
            <button class="btn btn-warning btnEditar" data-codigo="${juegoNuevo.getCodigo()}">Editar</button>
            <button class="btn btn-danger btnEliminar" data-codigo="${juegoNuevo.getCodigo()}">Borrar</button>
        </div>
    </td>
  `;

  table.appendChild(fila);

  const btnEliminar = fila.querySelector(".btnEliminar");
  btnEliminar.addEventListener("click", () => eliminarJuego(juegoNuevo.getCodigo()));

  const btnEditar = fila.querySelector(".btnEditar");
  btnEditar.addEventListener("click", () => editarJuego(juegoNuevo.getCodigo()));

  
};

const guardarLocalStorage = () => {
  localStorage.setItem("listado", JSON.stringify(listaDeJuegos));
};

const eliminarJuego = (codigo) => {
  listaDeJuegos = listaDeJuegos.filter((juego) => juego.getCodigo() !== codigo);
  guardarLocalStorage();
  renderizarTabla();
};

const renderizarTabla = () => {
  table.innerHTML = "";

  listaDeJuegos.forEach((juego) => {
    añadirJuego(juego);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const datosGuardados = localStorage.getItem("listado");

  if (datosGuardados) {
    const juegosGuardados = JSON.parse(datosGuardados);
    listaDeJuegos = juegosGuardados.map(
      (juego) =>
        new Juego(
          juego.codigo,
          juego.titulo,
          juego.descripcion,
          juego.imagen,
          juego.genero,
          juego.creador,
          juego.lanzamiento,
          juego.edad,
          juego.precio
        )
    );
    renderizarTabla();
  }

  const adminLoggedIn = localStorage.getItem('adminLogged') === 'true';
  const invitadoLoggedIn = localStorage.getItem('invitadoLogged') === 'true';

  if (!adminLoggedIn) {
    window.location.href = '../pages/accesoDenegado.html';
  } else {
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
  }
});

const editarJuego = (codigo) => {
  const juegoEditar = listaDeJuegos.find((juego) => juego.getCodigo() === codigo);

  if (juegoEditar) {

    document.getElementById("codigo").value = juegoEditar.getCodigo();
    document.getElementById("titulo").value = juegoEditar.getTitulo();
    document.getElementById("descripcion").value = juegoEditar.getDescripcion();
    document.getElementById("imagen").value = juegoEditar.getImagen();
    document.getElementById("selectGenero").value = juegoEditar.getGenero();
    document.getElementById("creador").value = juegoEditar.getCreador();
    document.getElementById("lanzamiento").value = juegoEditar.getLanzamiento();
    document.getElementById("selectEdad").value = juegoEditar.getEdad();
    document.getElementById("precio").value = juegoEditar.getPrecio();


    formularioDeJuegos.removeEventListener("submit", crearJuego);
    formularioDeJuegos.addEventListener("submit", () => {
      actualizarJuego(juegoEditar.getCodigo());
    });

    const modal = new bootstrap.Modal(document.getElementById("modalJuego"));
    modal.show();
  }
};

const actualizarJuego = (codigo) => {
  const juegoEditar = listaDeJuegos.find((juego) => juego.getCodigo() === codigo);

  if (juegoEditar) {

    juegoEditar.setTitulo(document.getElementById("titulo").value);
    juegoEditar.setDescripcion(document.getElementById("descripcion").value);
    juegoEditar.setImagen(document.getElementById("imagen").value);
    juegoEditar.setGenero(document.getElementById("selectGenero").value);
    juegoEditar.setCreador(document.getElementById("creador").value);
    juegoEditar.setLanzamiento(document.getElementById("lanzamiento").value);
    juegoEditar.setEdad(document.getElementById("selectEdad").value);
    juegoEditar.setPrecio(document.getElementById("precio").value)


    guardarLocalStorage();
    renderizarTabla();


    formularioDeJuegos.removeEventListener("submit", () => {
      actualizarJuego(juegoEditar.getCodigo());
    });
    formularioDeJuegos.addEventListener("submit", crearJuego);


    document.getElementById("codigo").value = "";
    modal.hide();
  }
};

formularioDeJuegos.addEventListener("submit", crearJuego);
