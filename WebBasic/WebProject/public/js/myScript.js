/*=============== SHOW MENU ===============*/

const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

    if(navToggle){
        navToggle.addEventListener('click', () =>{
            navMenu.classList.add('show-menu')
        })
    }

    // Menu Hiddem//

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
    

/*=============== REMOVE MENU MOBILE ===============*/


const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {

    const navMenu = document.getElementById('nav-menu')

// When we click on each nav__link, we remove the show-menu class

navMenu.classList.remove('show-menu')

}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER WACTHES ===============*/
// Function to update the title and price based on the active slide
function updateWatchDetails(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const title = activeSlide.getAttribute('data-title');
    const price = activeSlide.getAttribute('data-price');

    document.getElementById('home-title').innerText = title;
    document.getElementById('home-price').innerText = price;
}

const swiperWatches = new Swiper('.home__swiper', {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
        prev: {
            translate: [-100, 0, -500],
            rotate: [0, 0, 15],
            opacity: 0,
        },
        next: {
            translate: [-100, 0, -500],
            rotate: [0, 0, 15],
            opacity: 0,
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    on: {
        slideChange: function() {
            updateWatchDetails(this);
        }
    }
});

// Initial update on page load
document.addEventListener('DOMContentLoaded', () => {
    updateWatchDetails(swiperWatches);
});


/*=============== GSAP ANIMATION ===============*/

gsap.from('.home__images', 1.5, {opacity: 0, y:150, delay: .1})
gsap.from('.home__data', 1.8, {opacity: 0, x: -100, delay: .8})
gsap.from('.home__info', 1.8, {opacity: 0, x: -100, delay: 1})

// gsap.from('.textOverlay h1', 1.8, {opacity: 0, x: -100, delay: 1})
// gsap.from('.textOverlay h6', 1.8, {opacity: 0, x: -100, delay: 1})



document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', async (event) => {
        const watchId = event.target.getAttribute('data-id');
        try {
            const response = await fetch(`/cart/add/${watchId}`, { method: 'POST' });
            if (response.ok) {
                alert('Watch added to cart!');
            } else {
                alert('Failed to add watch to cart.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
  
  