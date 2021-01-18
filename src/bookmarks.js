import './styles/bookmarks.css';

const menuButton = document.querySelector('.header__button');
const header = document.querySelector('.header');
const headerMenu = document.querySelector('.header__navigation');

function toggleMenu() {
  headerMenu.classList.toggle('header__navigation_state-shown');
  menuButton.classList.toggle('header__button_type-cross-black');
}

menuButton.addEventListener('click', toggleMenu);
