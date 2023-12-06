import Juego from "./class.js";

const listaDeJuegos = [];
const formularioDeJuegos = document.querySelector("#formAdministrarJuego");

const crearJuego = (e) => {
  e.preventDefault();
  const nombreJuego = document.getElementById("titulo").value;
  const descripcionDelJuego = document.getElementById("descripcion").value;
  const imagenDelJuego = document.getElementById("imagen").value;
  const generoDelJuego = document.getElementById("selectGenero").value;
  const creadorDelJuego = document.getElementById("creador").value;
  const lanzamientoDelJuego = document.getElementById("lanzamiento").value;
  const edadRequeridaDelJuego = document.getElementById("selectEdad").value;

  const juegoNuevo = new Juego(
    undefined,
    nombreJuego,
    descripcionDelJuego,
    imagenDelJuego,
    generoDelJuego,
    creadorDelJuego,
    lanzamientoDelJuego,
    edadRequeridaDelJuego
  );

  listaDeJuegos.push(juegoNuevo);
  console.log(listaDeJuegos);
  añadirJuego(juegoNuevo);
};

const añadirJuego = (juegoNuevo) => {
    const table = document.querySelector(".table tbody");
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <th scope="row">${table.rows.length + 1}</th>
        <td>${juegoNuevo.getTitulo()}</td>
        <td class="text-truncate">${juegoNuevo.getDescripcion()}</td>
        <td class="text-center"> <img src=${juegoNuevo.getImagen()} height="150" width="150"></td>
        <td>${juegoNuevo.getGenero()}</td>
        <td>${juegoNuevo.getCreador()}</td>
        <td>${juegoNuevo.getLanzamiento()}</td>
        <td>${juegoNuevo.getEdad()}</td>
        <td>
            <div class="d-flex gap-3">
                <button class="btn btn-warning">Editar</button>
                <button class="btn btn-danger">Borrar</button>
            </div>
        </td>
    `;

    table.appendChild(fila);
    formularioDeJuegos.reset();
};


formularioDeJuegos.addEventListener("submit", crearJuego);
