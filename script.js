"use strict";
const porfolioGallery = [
    {
        link: './assets/images/singolo2_images/pic_01.jpg',
        alt: 'Жёлтый кораблик'
    },
    {
        link: './assets/images/singolo2_images/pic_02.jpg',
        alt: 'Счастливая зелёная девочка'
    },
    {
        link: './assets/images/singolo2_images/pic_03.jpg',
        alt: 'Город на луне'
    },
    {
        link: './assets/images/singolo2_images/pic_04.jpg',
        alt: 'Робот, который мечтает о сердце'
    },
    {
        link: './assets/images/singolo2_images/pic_05.jpg',
        alt: 'Странные танцующие животные'
    },
    {
        link: './assets/images/singolo2_images/pic_06.jpg',
        alt: 'Завод'
    },
    {
        link: './assets/images/singolo2_images/pic_07.jpg',
        alt: 'Чудики и техника'
    },
    {
        link: './assets/images/singolo2_images/pic_08.jpg',
        alt: 'Курочки на дереве'
    },
    {
        link: './assets/images/singolo2_images/pic_09.jpg',
        alt: 'Чудо-Юдо'
    },
    {
        link: './assets/images/singolo2_images/pic_10.jpg',
        alt: 'Слова'
    },
    {
        link: './assets/images/singolo2_images/pic_11.jpg',
        alt: 'Белый монстр'
    },
    {
        link: './assets/images/singolo2_images/pic_12.jpg',
        alt: 'Что-то упало на пол и стекло разбилось'
    }
];

/** Начальная загрузка галереи картинок блока Portfolio */
function downloadGallery () {
    porfolioGallery.forEach( image => createGallery(image));
}

downloadGallery();

// navigation
const navigation = document.querySelector('.navigation');
const navigationLinks = navigation.querySelectorAll('.navigation__link');

//slider
const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');

// portfolio
const porfolioButtonsContainer = document.querySelector('.potfolio__buttons');
const porfolioButtons = porfolioButtonsContainer.querySelectorAll('.portfolio__button');
const portfolioGallery = document.querySelector('.portfolio__images');

// form
const form = document.forms.form;
const inputs = [...form.elements];
const formButton = document.querySelector('.form__button');

// popup
const popup = document.querySelector('.popup');
const popupButton = document.querySelector('.popup__button');
const subjectField = document.querySelector('.popup__text_subject');
const descriptionField = document.querySelector('.popup__text_description');


/** Получение текущего и следующего слайдов */
function switchSlider(target) {
    let currentSlide = [...slides].findIndex( slide => {
        return slide.matches('.slide_visible');
    });

    if (target.closest('.slider__toggle_left')) {
        let previousSlide = currentSlide - 1;
        if (previousSlide < 0) {
            previousSlide = slides.length - 1;
        }
        toggleSliderStyle(currentSlide, previousSlide);
    }
    if (target.closest('.slider__toggle_right')) {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) {
            nextSlide = 0;
        }
        toggleSliderStyle(currentSlide, nextSlide);
    }
}

/** Переключение стилей слайдов */
function toggleSliderStyle(currentSlide, nextSlide) {
    const sliderLine = document.querySelector('.slider__decoration');
    const sliderToggle = document.querySelectorAll('.slider__path');

    slides[currentSlide].classList.remove('slide_visible');
    slides[currentSlide].classList.add('slide_invisible');
    slides[nextSlide].classList.remove('slide_invisible');
    slides[nextSlide].classList.add('slide_visible');
        
    slider.style.backgroundColor = `${slides[nextSlide].getAttribute('data-color')}`;
    sliderLine.style.backgroundColor = `${slides[nextSlide].getAttribute('data-color')}`;
}

/** Вставка шаблона карточки блока Portfolio в разметку */
function createGallery(image) {
    const container = document.querySelector('.portfolio__images');
    let card = createTemplate(image);

    container.insertAdjacentHTML(
        "beforeend",
        card
    );
}

/** Создание шаблона карточки блока Portfolio */
function createTemplate(image) {
    return `
            <li class="portfolio__item">
                <img class="portfolio__image" src="${image.link}" alt="${image.alt}">
            </li>
           `
}

/** Очистка галереи карточек блока Portfolio */
function cleanGallery() {
    let container = document.querySelector('.portfolio__images');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

/** Случайное число для галереи блока Portfolio */
function randomNumber() {
    return 0.5 - Math.random();
}

/** Замена классов у элементов разметки */
function addNewClass(options) {
    let array = options.array;
    let target = options.target;
    let removeClass = options.removeClass;
    let addClass = options.addClass;

    array.forEach( item => item.classList.remove(removeClass) );
    target.classList.add(addClass);
}

/** Заполнение полей попапа */
function fillPopup() {
    const subject = form.elements.subject;
    const description = form.elements.description;

    if (subject.value) {
        subjectField.textContent = `Тема: ${subject.value}`;
    }
    if (description.value) {
        descriptionField.textContent = `Описание: ${description.value}`
    }

    popup.classList.remove('popup_invisible');
}

/** Валидация формы */
function formValidation() {
    const name = form.elements.name;
    const email = form.elements.email;

    let nameValidity = name.validity.valid;
    let emailValidity = email.validity.valid;
    let validityResult = nameValidity && emailValidity;

    if (!validityResult) {
        formButton.setAttribute('disabled', true);
        formButton.classList.add('form__button_inactive');
        formButton.classList.remove('form__button_active');
    }

    if (validityResult) {
        formButton.removeAttribute('disabled', true);
        formButton.classList.remove('form__button_inactive');
        formButton.classList.add('form__button_active');
    }
}

/** Плавный скролл */
function smoothScroll(target) {
    if (target.getAttribute('data-id') === 'home') {
        window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
        let id = target.getAttribute('data-id');
        let headerHeight = document.querySelector('.header').offsetHeight;
        let height = document.querySelector(`#${id}`).offsetTop - headerHeight;

        window.scrollTo({top: height, behavior: 'smooth'});
    }

}

/** Слушатель переключения активных линков в навигации/скролл */
navigation.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (event.target.closest('.navigation__link')) {
        addNewClass({
            array: navigationLinks,
            target: event.target,
            removeClass: 'navigation__link_active',
            addClass: 'navigation__link_active'
        });
        smoothScroll(event.target);
    }
});

/** Слушатель для включение/выключения экрана телефона */
slider.addEventListener('click', (event) => {
    if (event.target.closest('.phone__button')) {
        event.target.previousElementSibling.classList.toggle('phone__display_inactive');
    }
    if (event.target.closest('.slider__toggle')) {
        switchSlider(event.target);
    }
});

/** Слушатель кнопок блока Portfolio */
porfolioButtonsContainer.addEventListener('click', (event) => {
    if (event.target.closest('.portfolio__button')) {
        addNewClass({
            array: porfolioButtons,
            target: event.target,
            removeClass: 'portfolio__button_active',
            addClass: 'portfolio__button_active'
        });
        cleanGallery();
  
        porfolioGallery.sort(randomNumber).forEach( image => createGallery(image) );
    }
});

/** Слушатель изображений блока Portfolio */
portfolioGallery.addEventListener('click', (event) => {
    const cards = document.querySelectorAll('.portfolio__image');
    if (event.target.closest('.portfolio__image')) {
        addNewClass({
            array: cards,
            target: event.target,
            removeClass: 'portfolio__image_active',
            addClass: 'portfolio__image_active'
        });
    }
});

/** Слушатель инпутов формы */
inputs.forEach( input => {
    input.addEventListener('input', () => {
        formValidation();
    });
});

/** Слушатель формы */
form.addEventListener('submit', (event) => {
    event.preventDefault();

    fillPopup();

    form.reset();
});

/** Закрытие попапа */
popupButton.addEventListener('click', () => {
    popup.classList.add('popup_invisible');
});
