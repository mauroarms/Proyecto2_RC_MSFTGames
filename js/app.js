const getSize = () => {
    if (screen.width <= 350) {
        return 1;
    } else if (screen.width <= 750 && screen.width > 350) {
        return 3;
    } else if (screen.width <= 990 && screen.width > 750) {
        return 4;
    } else if (screen.width <= 1100 && screen.width > 990) {
        return 5;
    } else {
        return 6;
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
