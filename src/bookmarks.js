import './styles/bookmarks.css';
import Header from './js/components/Header';
import MainApi from './js/api/MainApi';
import { mainApiConfig } from './js/constants/apiConfigs';
import {
  headerSelectors,
  leadSelectors,
} from './js/constants/bookmarksSelectors';

if (!localStorage.getItem('user')) {
  window.location.replace('./');
}
const bookmarksHeader = new Header(headerSelectors);
const mainApi = new MainApi(mainApiConfig);

bookmarksHeader.render(localStorage.getItem('user'));
leadSelectors.userName.textContent = localStorage.getItem('user');
bookmarksHeader.logoutLink.addEventListener('click', () => {
  mainApi.logout();
  localStorage.clear();
  bookmarksHeader.render('');
  window.location.replace('./');
});
bookmarksHeader.headerMenuButton.addEventListener('click', bookmarksHeader.toggleMenu);

console.log(localStorage);

// const menuButton = document.querySelector('.header__button');
// const header = document.querySelector('.header');
// const headerMenu = document.querySelector('.header__navigation');
//
// function toggleMenu() {
//   headerMenu.classList.toggle('header__navigation_state-shown');
//   menuButton.classList.toggle('header__button_type-cross-black');
// }
//
// menuButton.addEventListener('click', toggleMenu);
