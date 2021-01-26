// popup selectors
export const signInPopup = document.querySelector('.signin');
export const signUpPopup = document.querySelector('.signup');
export const successMessage = document.querySelector('.auth-success');

// header selectors
export const headerSelectors = {
  header: document.querySelector('.header'),
  headerMenu: document.querySelector('.header__navigation'),
  headerMenuButton: document.querySelector('.header__button'),
  authLink: document.querySelector('.header__link-auth'),
  logoutLink: document.querySelector('.header__link-logout'),
  bookmarksLink: document.querySelector('.header__nav-item_route-bookmarks'),
};

// popup selectors
export const popupSelectors = {
  popupWindow: document.querySelector('.popup'),
  closeButton: document.querySelector('.popup__hide-btn'),
  openButton: document.querySelector('.header__link-auth'),
  popupContent: document.querySelector('.popup__content'),
  signInPopup,
  signUpPopup,
  signInLink: signUpPopup.querySelector('.popup__link'),
  signUpLink: signInPopup.querySelector('.popup__link'),
  successMessage,
  successToSignIn: successMessage.querySelector('.popup__link'),
};

// forms' selectors
export const formSelectors = {
  signInForm: signInPopup.querySelector('form'),
  signUpForm: signUpPopup.querySelector('form'),
};

// results block selectors
export const resultsSelectors = {
  resultsShell: document.querySelector('.results'),
  preloaderBlock: document.querySelector('.results__preloader'),
  failBlock: document.querySelector('.results__fail'),
  failTitle: document.querySelector('.results__fail-title'),
  articlesSection: document.querySelector('.results__articles'),
  articlesContainer: document.querySelector('.results__container'),
  showMoreButton: document.querySelector('.results__expand'),
};
