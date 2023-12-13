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


