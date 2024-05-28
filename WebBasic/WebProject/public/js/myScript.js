/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu Hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
};
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== SWIPER WATCHES ===============*/
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
        slideChange: function () {
            updateWatchDetails(this);
        }
    }
});

// Initial update on page load
document.addEventListener('DOMContentLoaded', () => {
    updateWatchDetails(swiperWatches);
});

/*=============== GSAP ANIMATION ===============*/
gsap.from('.home__images', 1.5, { opacity: 0, y: 150, delay: .1 });
gsap.from('.home__data', 1.8, { opacity: 0, x: -100, delay: .8 });
gsap.from('.home__info', 1.8, { opacity: 0, x: -100, delay: 1 });

/*=============== QUICK VIEW MODAL ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('quickViewModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', (e) => {
            const title = e.target.getAttribute('data-title');
            const price = e.target.getAttribute('data-price');
            const image = e.target.getAttribute('data-image');

            modalImage.src = image;
            modalTitle.innerText = title;
            modalPrice.innerText = `$${price}`;
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cart-items');
    const closeCartBtn = document.querySelector('.close-btn');

    let cart = [];

    function updateCartCount() {
        cartCount.innerText = cart.length;
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.imageURL}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>Price: $${item.price}</p>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                updateCartCount();
                renderCartItems();
            });
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.getAttribute('data-id');
            try {
                const response = await fetch(`/cart/add/${productId}`, { method: 'POST' });
                if (response.ok) {
                    const product = await response.json();
                    cart.push(product);
                    updateCartCount();
                } else {
                    alert('Failed to add product to cart.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        renderCartItems();
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });



    
    updateCartCount();



    window.onload = function () {
        document.getElementById("loginBtn").onclick = function () {
          toggleFormVisibility("loginForm");
        };

        document.getElementById("registerBtn").onclick = function () {
          toggleFormVisibility("registerForm");
        };
      };
});
