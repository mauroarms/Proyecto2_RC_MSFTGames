import juego from "./class"

const formularioJuegos = document.getElementById("formAdministrarJuego")
const juegos = []

const añadirJuego = (e) => {
    e.preventdefault()
    const titulo = document.getElementById("titulo")
    const descripcion = document.getElementById("descripcion")
    const imagen = document.getElementById("imagen")
    const genero = document.getElementById("genero")
    const creador = document.getElementById("creador")
    const lanzamiento = document.getElementById("lanzamiento")
    const edad = document.getElementById("edad")

    const juegoNuevo = new juego(titulo,descripcion,imagen,genero,creador,lanzamiento,edad)
    juegos.push(juegoNuevo)
    agregarPeliculaATabla(juegoNuevo)
}

const agregarPeliculaATabla = (juego) =>{
    const table = document.querySelector(".table tbody")
    const fila = document.createElement("tr")

    const numeroFila = juegos.length + 1

    fila.innerHTML = `
    <th scope="row">${numeroFila}</th>
    <td>${juego.titulo}<td>
    <td>${juego.descripcion}<td>
    <td>${juego.imagen}<td>
    <td>${juego.genero}<td>
    <td>${juego.creador}<td>
    <td>${juego.lanzamiento}<td>
    <td>${juego.edad}<td>
    <td>
            <div class="d-flex gap-3">
                <button class="btn btn-warning">Editar</button>
                <button class="btn btn-danger"">Borrar</button>
            </div>
        </td>
    `

    table.appendChild(fila);
    formularioJuegos.reset()
}