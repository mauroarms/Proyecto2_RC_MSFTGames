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

//Obtener Juegos
const juegos = JSON.parse(localStorage.getItem("listado")) || [];

//Obtener código del juego vía url
const parametroIdUrl = new URLSearchParams(window.location.search);
const codigoJuego = parametroIdUrl.get('codigo')

//Obtener Objeto Juego Seleccionado
const juego = juegos.find((Juego)=>Juego.codigo === codigoJuego)
console.log(juego)


const graficarJuego = (Juego) =>{
    const titulo = document.querySelector(".contTitProduct h2")
    titulo.innerHTML = Juego.titulo

    const imagenPortada = document.getElementById("imgPortada");
    imagenPortada.src = Juego.imagen

    const imagenBanner = document.querySelector(".imgBanner img")
    imagenBanner.src = Juego.imagen

    const creadorYCategoria = document.querySelector(".contTitProduct h6");
    creadorYCategoria.innerHTML = Juego.creador + " • " + Juego.genero

    const buttonGP = document.querySelector("#btnGP")
    buttonGP.innerHTML = `OBTENER GAME PASS <br> Ahorra ARS$ ${Juego.precio*0.2} con<span>GAME PASS</span>`

    const buttonCompra = document.querySelector("#btnCompra")
    buttonCompra.innerHTML = `COMPRAR <br> ARS$ ${Juego.precio}`


    //EDAD
    const esrbEdadImg = document.querySelector(".esrbRate img")
    const esrbEdadTxt = document.getElementById("esrbTxt")

    console.log(esrbEdadTxt)
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
    console.log(contenedor)
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
console.log(codigoJuego)
