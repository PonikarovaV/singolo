"use strict";

const navigation = document.querySelector('.navigation');
const navigationLinks = navigation.querySelectorAll('.navigation__link');

const slider = document.querySelector('.slider__box');
const slides = slider.querySelectorAll('.slide');

const porfolioButtonsContainer = document.querySelector('.potfolio__buttons');
const porfolioButtons = porfolioButtonsContainer.querySelectorAll('.portfolio__button')
const portfolioImages = document.querySelectorAll('.portfolio__item');

/** Слушатель переключения активных линков в навигации */
navigation.addEventListener('click', (event) => {
    navigationLinks.forEach( link => link.classList.remove('navigation__link_active') );
    event.target.classList.add('navigation__link_active');
});

/** Слушатель для включение/выключения экрана телефона */
slider.addEventListener('click', (event) => {
    if (event.target.closest('.phone__button')) {
        event.target.previousElementSibling.classList.toggle('phone__display_inactive');
    }
    if (event.target.closest('.slider__toggle_left')) {
        let currentSlide = [...slides].findIndex( slide => {
            return slide.matches('.slide_visible');
        });
        let previousSlide = currentSlide - 1;
        if (previousSlide < 0) {
            previousSlide = slides.length - 1;
        }
        slides[currentSlide].classList.remove('slide_visible');
        slides[currentSlide].classList.add('slide_invisible');
        slides[previousSlide].classList.remove('slide_invisible');
        slides[previousSlide].classList.add('slide_visible');
    }
    if (event.target.closest('.slider__toggle_right')) {
        let currentSlide = [...slides].findIndex( slide => {
            return slide.matches('.slide_visible');
        });
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) {
            nextSlide = 0;
        }
        slides[currentSlide].classList.remove('slide_visible');
        slides[currentSlide].classList.add('slide_invisible');
        slides[nextSlide].classList.remove('slide_invisible');
        slides[nextSlide].classList.add('slide_visible');
    }
});




const porfolioGallery = [
    {
        link: './assets/images/singolo2_images/pic_01.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_02.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_03.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_04.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_05.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_06.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_07.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_08.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_09.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_10.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_11.jpg'
    },
    {
        link: './assets/images/singolo2_images/pic_12.jpg'
    }
]

porfolioGallery.forEach( image => createGallery(image));

function createGallery(image) {
    let container = document.querySelector('.portfolio__images');
    let card = createTemplate(image);

    container.insertAdjacentHTML(
        "beforeend",
        card
    )
}

function createTemplate(image) {
    return `
            <li class="portfolio__item">
                <img class="portfolio__image" src="${image.link}">
            </li>
           `
}

porfolioButtonsContainer.addEventListener('click', (event) => {
    if (event.target.closest('.portfolio__button')) {
        porfolioButtons.forEach( button => button.classList.remove('portfolio__button_active'));
        event.target.classList.add('portfolio__button_active');

        cleanGallery();
  
        porfolioGallery.sort(randomNumber).forEach( image => createGallery(image) );
    }
})

function randomNumber() {
    return 0.5 - Math.random();
}

function cleanGallery() {
    let container = document.querySelector('.portfolio__images');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}