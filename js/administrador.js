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
  guardarLocalStorage();
  renderizarTabla();
  formularioDeJuegos.reset();
};

const añadirJuego = (juegoNuevo) => {
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
          juego.edad
        )
    );
    renderizarTabla();
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


    formularioDeJuegos.removeEventListener("submit", crearJuego);
    formularioDeJuegos.addEventListener("submit", () => {
      actualizarJuego(juegoEditar.getCodigo());
    });

l
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
