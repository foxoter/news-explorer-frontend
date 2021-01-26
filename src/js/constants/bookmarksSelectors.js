export const headerSelectors = {
  header: document.querySelector('.header'),
  headerMenu: document.querySelector('.header__navigation'),
  headerMenuButton: document.querySelector('.header__button'),
  logoutLink: document.querySelector('.header__link-logout'),
  bookmarksLink: document.querySelector('.header__nav-item_route-bookmarks'),
};

export const leadSelectors = {
  leadTitle: document.querySelector('.lead__title'),
  leadText: document.querySelector('.lead__text'),
  userName: document.querySelector('#username'),
  bookMarksCount: document.querySelector('#bookmarks-count'),
  keyWordOne: document.querySelector('#keyword-1'),
};

export const resultsSelectors = {
  resultsShell: document.querySelector('.results'),
  articlesSection: document.querySelector('.results__articles'),
  articlesContainer: document.querySelector('.results__container'),
};
