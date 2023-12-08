import Juego from "./class.js";

let listaDeJuegos = [];
const formularioDeJuegos = document.querySelector("#formAdministrarJuego");
const table = document.querySelector(".table tbody");

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
  añadirJuego(juegoNuevo);
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
            <button class="btn btn-warning">Editar</button>
            <button class="btn btn-danger btnEliminar">Borrar</button>
        </div>
    </td>
  `;

  
  table.appendChild(fila);
  const btnEliminar = fila.querySelector(".btnEliminar");
  btnEliminar.addEventListener("click", () => eliminarJuego(juegoNuevo.getCodigo()));
  formularioDeJuegos.reset()
};

const guardarLocalStorage = () => {
  localStorage.setItem("listado", JSON.stringify(listaDeJuegos));
};

const eliminarJuego = (codigo) => {
    listaDeJuegos = listaDeJuegos.filter((juego) => juego.getCodigo() !== codigo);
    guardarLocalStorage();
    renderizarTabla();
}

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
    juegosGuardados.forEach((juego) => {
      const juegoObj = new Juego(
        undefined,
        juego.titulo,
        juego.descripcion,
        juego.imagen,
        juego.genero,
        juego.creador,
        juego.lanzamiento,
        juego.edad,
        juego.precio
      );

      listaDeJuegos.push(juegoObj);
      añadirJuego(juegoObj);
    });
  }
});

formularioDeJuegos.addEventListener("submit", crearJuego);
