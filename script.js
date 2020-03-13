"use strict";

const navigation = document.querySelector('.navigation');
const navigationLinks = navigation.querySelectorAll('.navigation__link');

/** Слушатель переключения активных линков в навигации */
navigation.addEventListener('click', (event) => {
    navigationLinks.forEach( link => link.classList.remove('navigation__link_active') );
    event.target.classList.add('navigation__link_active');
});

