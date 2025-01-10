// Initialize Swiper 
const swiper = new Swiper('.swiper', {

    centeredSlides: true,
    spaceBetween: 25,

    allowTouchMove: false,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    },
    
});