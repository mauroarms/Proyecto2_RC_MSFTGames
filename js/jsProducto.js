import {Comentario} from "./class.js"
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

const tabs = document.querySelectorAll('.tab_btn');
const all_content = document.querySelectorAll('.content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e)=>{
        tabs.forEach(tab=>{tab.classList.remove('active')});
        tab.classList.add('active');

        let line=document.querySelector('.line');
        line.style.width = e.target.offsetWidth + "px";
        line.style.left = e.target.offsetLeft + "px";

        all_content.forEach(content=>{content.classList.remove('active')})
        all_content[index].classList.add('active');
    })
})

/* ===================== JUEGOS RECOMENDADOS ========================*/
const juegos = JSON.parse(localStorage.getItem("listado")) || [];

const parametroIdUrl = new URLSearchParams(window.location.search);
const codigoJuego = parametroIdUrl.get('codigo')

const juego = juegos.find((Juego)=>Juego.codigo === codigoJuego)

/* ===================== CARGAR JUEGOS EN HTML ========================*/

const graficarJuego = (Juego) =>{
    const titulo = document.querySelector(".contTitProduct h2")
    titulo.innerHTML = Juego.titulo

    const imagenPortada = document.getElementById("imgPortada");
    imagenPortada.src = Juego.imagen

    const imagenBanner = document.querySelector(".imgBanner img")
    imagenBanner.src = Juego.imagen

    const imgCarrousel = document.getElementById("primeraImgCarrousel")
    imgCarrousel.src = Juego.imagen

    const creadorYCategoria = document.querySelector(".contTitProduct h6");
    creadorYCategoria.innerHTML = Juego.creador + " • " + Juego.genero

    const buttonGP = document.querySelector("#btnGP")
    buttonGP.innerHTML = `OBTENER GAME PASS <br> Ahorra ARS$ ${Juego.precio*0.2} con<span>GAME PASS</span>`

    const buttonCompra = document.querySelector("#btnCompra")
    buttonCompra.innerHTML = `COMPRAR <br> ARS$ ${Juego.precio}`


    //EDAD
    const esrbEdadImg = document.querySelector(".esrbRate img")
    const esrbEdadTxt = document.getElementById("esrbTxt")

 
    switch(Juego.edad){
        case "+10":
            esrbEdadImg.src = "https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg"
            esrbEdadTxt.innerHTML = "+10 <i class='fa-solid fa-up-right-from-square' ></i>"
            break;
        case "13":
            esrbEdadImg.src = "https://www.esrb.org/wp-content/uploads/2019/05/T.svg"
            esrbEdadTxt.innerHTML = "+13 <i class='fa-solid fa-up-right-from-square' ></i>"
            break;
        case "17":
            esrbEdadImg.src = "https://www.esrb.org/wp-content/uploads/2019/05/M.svg"
            esrbEdadTxt.innerHTML = "+17 <i class='fa-solid fa-up-right-from-square' ></i>"
            break;
        case "18":
            esrbEdadImg.src = "https://www.esrb.org/wp-content/uploads/2019/05/AO.svg"
            esrbEdadTxt.innerHTML = "+18 <i class='fa-solid fa-up-right-from-square' ></i>"
            break;
    }

    const descripcion = document.getElementById("txtDescripcion")
    const creador= document.getElementById("txtCreador")
    const fecha= document.getElementById("txtFecha")
    const id = document.getElementById("txtCodigo")

    descripcion.innerHTML = Juego.descripcion
    creador.innerHTML = Juego.creador
    fecha.innerHTML = Juego.lanzamiento
    id.innerHTML = Juego.codigo
  
}
graficarJuego(juego);

/* ===================== JUEGOS RECOMENDADOS ========================*/
const getSize = () => {
    if (screen.width <= 350) {
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

const renderJuegos = () => {
    const contenedor = document.querySelector(".swiper-wrapper");
    if (!juegos.length) {
        contenedor.innerHTML = `<h2 class="display-3 text-center mx-auto">No hay juegos guardados</h2>`;
    }
    juegos?.map((juego) => {
        if(juego.codigo !== codigoJuego){
            contenedor.innerHTML += 
            `<div class="swiper-slide flex-column">
                <a href="${window.location.origin}/pages/detalleProducto.html?codigo=${juego.codigo}" class="game" class="juego">
                    <img src="${juego.imagen}" alt="${juego.descripcion}" />
                    <div class="card-body">
                        <h3 class="card-title pt-3 text-center">
                            ${juego.titulo}    
                        </h3>
                        <h5 class="card-title py-4 text-center">
                            ${juego.creador}    
                        </h5>
                    </div>
                </a>
            </div>`
        }
    });
};

renderJuegos();


/* ===================== COMENTARIOS ========================*/
const contenedorComentario = document.getElementById("contenedorComentario");
const etiqSinCom = document.createElement("div");

const agregarComentario = (Comentario) =>{

    const estrellas = definirEstrellas(Comentario)
    
    const etiqComentario = document.createElement("div")
    etiqComentario.innerHTML = `
    <div class="comentario p-4">
        <div class="usuario d-flex">
            <img src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg" alt="">
            <div>
                <h3>${Comentario.usuario}</h3>
                <p>${Comentario.fecha}</p>
            </div>
        </div>
        <h4 class="my-3">${Comentario.titulo}</h4>
        <p>
        ${estrellas}
        </p>
        <p>${Comentario.descripcion}</p>
    </div>
    `

    contenedorComentario.prepend(etiqComentario)
}
const definirEstrellas = (Comentario) =>{
    let cantidadI =""

    switch(Comentario.cantidadEstrellas){
        case "estrella1": 
            cantidadI += `
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            `
            break;
        case "estrella2": 
            cantidadI += `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            `
            break;
        case "estrella3": 
            cantidadI += `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            `
            break;
        case "estrella4": 
            cantidadI += `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            `
            break;
        case "estrella5": 
            cantidadI += `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            `
            break;
    }
    
    return(cantidadI)
}
const graficarComentarios = (comentarios) =>{
    if(comentarios.length>0){
        for(let i=0; i<comentarios.length; i++) agregarComentario(comentarios[i]);
    }else{
        
        etiqSinCom.innerHTML = `
        <h2 class="text-center">Nadie ha comentado todavía... ¡Agrega un comentario!`
        contenedorComentario.appendChild(etiqSinCom)
    }
}
const abrirModalComentario = (e) =>{
    e.preventDefault();
    ventanaModal.show();
}
const refrescarPuntuacion=(comentarios)=>{
    const totalOpiniones = document.getElementById("total")
    totalOpiniones.innerHTML = comentarios.length
    
    const promedio = document.getElementById("promedio")
    const porc5 = document.getElementById("porc5")
    const porc4 = document.getElementById("porc4")
    const porc3 = document.getElementById("porc3")
    const porc2 = document.getElementById("porc2")
    const porc1 = document.getElementById("porc1")
    const barra5 = document.getElementById("longBarra5")
    const barra4 = document.getElementById("longBarra4")
    const barra3 = document.getElementById("longBarra3")
    const barra2 = document.getElementById("longBarra2")
    const barra1 = document.getElementById("longBarra1")
    
    let totalCincoE = 0 
    let totalCuatroE = 0 
    let totalTresE = 0 
    let totalDosE = 0 
    let totalUnaE = 0 
    
    comentarios.map(Comentario => {
        switch(Comentario.cantidadEstrellas){
            case "estrella1": 
                totalUnaE++
                break;
            case "estrella2": 
                totalDosE++
                break;
            case "estrella3": 
                totalTresE++
                break;
            case "estrella4": 
                totalCuatroE++
                
                break;
            case "estrella5": 
                totalCincoE++;   
                break;
        }
    });
    
        let valor5E = (totalCincoE/comentarios.length *100).toFixed(1) 
        let valor4E = (totalCuatroE/comentarios.length*100).toFixed(1)
        let valor3E = (totalTresE/comentarios.length*100).toFixed(1)  
        let valor2E = (totalDosE/comentarios.length*100).toFixed(1) 
        let valor1E = (totalUnaE/comentarios.length*100).toFixed(1) 
        let promTotal = ((5*totalCincoE+4*totalCuatroE+3*totalTresE+2*totalDosE+totalUnaE)/comentarios.length).toFixed(1) 

        if(isNaN(promTotal)){
            promedio.innerHTML = 0 + '<i class="fa-solid fa-star"></i>'

            porc5.innerHTML = 0 + "%"
            porc4.innerHTML = 0 + "%"
            porc3.innerHTML = 0 + "%"
            porc2.innerHTML = 0 + "%"
            porc1.innerHTML = 0 + "%"
        
            barra5.style.width = 0 + "%"
            barra4.style.width = 0 + "%"
            barra3.style.width = 0 + "%"
            barra2.style.width = 0 + "%"
            barra1.style.width = 0 + "%"
        }else{
            promedio.innerHTML = promTotal + '<i class="fa-solid fa-star"></i>'

            porc5.innerHTML = valor5E + "%"
            porc4.innerHTML = valor4E + "%"
            porc3.innerHTML = valor3E + "%"
            porc2.innerHTML = valor2E + "%"
            porc1.innerHTML = valor1E + "%"
        
            barra5.style.width = valor5E + "%"
            barra4.style.width = valor4E + "%"
            barra3.style.width = valor3E + "%"
            barra2.style.width = valor2E + "%"
            barra1.style.width = valor1E + "%"
        }

    

}

const arrayComentarios = JSON.parse(localStorage.getItem(codigoJuego)) || [];
graficarComentarios(arrayComentarios);
refrescarPuntuacion(arrayComentarios);

const crearComentario = (e) =>{
    e.preventDefault();
    const fechaActual = new Date()
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const fechaComentario = `${año}-${mes}-${dia}`;

    /*Tomar Valores del formulario*/
    const titulo = document.getElementById("tituloComentario"),
    descripcion = document.getElementById("descripcionComentario"),
    valoracion = document.getElementById("valoracionComentario"), 
    usuario = document.getElementById("autorComentario");

    /*Crear Comentario*/
    const nuevoComentario = new Comentario(usuario.value,titulo.value,descripcion.value,fechaComentario,valoracion.value,codigoJuego)
    
    
    /*Agregar Pelicula al Array*/
    if(arrayComentarios.length === 0){
        contenedorComentario.removeChild(etiqSinCom)
    }

    arrayComentarios.push(nuevoComentario);

    /*Ejecutar función que guarda el Array de peliculas actualizado*/
    guardarEnLS();

    /*Agregar la pelicula a la tabla*/
    agregarComentario(nuevoComentario);
    cerrarFormularioPelicula();
    refrescarPuntuacion(arrayComentarios);

}
const guardarEnLS = () => localStorage.setItem(codigoJuego, JSON.stringify(arrayComentarios))

const cerrarFormularioPelicula = () => ventanaModal.hide()

//Accion de botones
const ventanaModal = new bootstrap.Modal(document.getElementById("comentarioModal"));
const formularioComentario = document.getElementById("formNewComentario");
const btnAgregarComentario = document.getElementById("btnAgregar");

btnAgregarComentario.addEventListener("click", abrirModalComentario) //Abrir Modal al darle click
formularioComentario.addEventListener("submit", crearComentario)  //Crear Peli al enviar formulario