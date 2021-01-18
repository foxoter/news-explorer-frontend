import './styles/index.css';

const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__hide-btn');
const openButton = document.querySelector('.header__link-auth');
const searchButton = document.querySelector('.search__btn');
const searchFail = document.querySelector('.results__fail');
const searchPreloader = document.querySelector('.results__preloader');
const menuButton = document.querySelector('.header__button');
const header = document.querySelector('.header');
const headerMenu = document.querySelector('.header__navigation');

function toggleMenu() {
  header.classList.toggle('header_background-on');
  headerMenu.classList.toggle('header__navigation_state-shown');
  menuButton.classList.toggle('header__button_type-cross-white');
}

function closePopup() {
  popup.setAttribute('style', 'display: none');
}

function openPopup() {
  popup.setAttribute('style', 'display: flex');
}

function toggleResultViews() {
  searchPreloader.setAttribute('style', 'display: block');
  setTimeout(() => {
    searchPreloader.setAttribute('style', 'display: none');
    searchFail.setAttribute('style', 'display: block');
  }, 2000);
  setTimeout(() => {
    searchFail.setAttribute('style', 'display: none');
  }, 3000);
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
searchButton.addEventListener('click', toggleResultViews);
menuButton.addEventListener('click', toggleMenu);
