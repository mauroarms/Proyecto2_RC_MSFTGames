const getSize = () => {
    if (screen.width <= 350) {
        return 1;
    } else if (screen.width <= 750 && screen.width > 350) {
        return 2;
    } else if (screen.width <= 990 && screen.width > 750) {
        return 4;
    } else {
        return 5;
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
const juegos = JSON.parse(localStorage.getItem("listado"));
const renderJuegos = () => {
    const contenedor = document.querySelector(".swiper-wrapper");
    juegos.map((juego) => {
        contenedor.innerHTML += `<div class="swiper-slide flex-column">
        <img src="${juego.imagen}" alt="${juego.descripcion}" />
        <div class="card-body">
            <h3 class="card-title py-3 text-center">
                <a href="" class="game">${juego.titulo}</a>    
            </h3>
        </div>
    </div>`;
    });
};

const searchJuego = () => {
    const card = document.querySelector(".card");
    const nombre = document.getElementById("nombre").value;
    if (!nombre) {
        alert("Ingrese un nombre");
    }
    const juego = juegos.find((juego) =>
        juego.titulo.toUpperCase().includes(nombre.toUpperCase())
    );
    console.log(juego);
    card.innerHTML = `<div class="card">
    <img src="${juego.imagen}" alt="${juego.descripcion}" class="img-fluid"/>
    <div class="card-body">
        <h3 class="card-title py-3 text-center">
            <a href="" class="game">${juego.titulo}</a>    
        </h3>
    </div>
</div>`;
};
