import './styles/index.css';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import Header from './js/components/Header';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import ArticlesContainer from './js/components/ArticlesContainer';
import Article from './js/components/Article';

import { mainApiConfig, newsApiConfig } from './js/constants/apiConfigs';
import { errorTexts, searchErrors } from './js/constants/errors';
import { errorsTranslator, formatDate } from './js/utils/helpers';

import {
  popupSelectors,
  formSelectors,
  headerSelectors,
  resultsSelectors,
} from './js/constants/indexSelectors';

// classes instances
const popup = new Popup(popupSelectors);
const signInForm = new Form(formSelectors.signInForm, errorTexts);
const signUpForm = new Form(formSelectors.signUpForm, errorTexts);
const mainApi = new MainApi(mainApiConfig);
const header = new Header(headerSelectors);
const newsApi = new NewsApi(newsApiConfig);
const searchForm = document.querySelector('.search__form');
const articlesBlock = new ArticlesContainer(resultsSelectors);

// header rendering
header.render(localStorage.getItem('user'));

// popups rendering
popup.openButton.addEventListener('click', popup.open);
popup.closeButton.addEventListener('click', () => {
  signInForm.reset();
  signUpForm.reset();
  popup.close();
});
popup.signUpLink.addEventListener('click', () => {
  signInForm.reset();
  popup.clearContent();
  popup.setContent(popup.signUpPopup);
});
popup.signInLink.addEventListener('click', () => {
  signUpForm.reset();
  popup.clearContent();
  popup.setContent(popup.signInPopup);
});
popup.successToSignIn.addEventListener('click', () => {
  popup.clearContent();
  popup.setContent(popup.signInPopup);
});

// login and logout
function resetSearch() {
  searchForm.reset();
  articlesBlock.resetSection();
}

function getUser() {
  return mainApi.getUser()
    .then((user) => {
      localStorage.setItem('user', user.name);
      header.render(user.name);
    })
    .catch((err) => console.log(err));
}

function logout() {
  mainApi.logout()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
signUpForm.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const body = {
    email: event.target.elements[0].value,
    password: event.target.elements[1].value,
    name: event.target.elements[2].value,
  };
  mainApi.signup(body)
    .then(() => {
      signUpForm.reset();
      popup.clearContent();
      popup.setContent(popup.successMessage);
    })
    .catch((err) => {
      signUpForm.setServerError(errorsTranslator(err.message));
    });
});

signInForm.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const body = {
    email: event.target.elements[0].value,
    password: event.target.elements[1].value,
  };
  mainApi.signin(body)
    .then((res) => {
      signInForm.reset();
      popup.close();
      getUser();
      resetSearch();
    })
    .catch((err) => {
      signInForm.setServerError(errorsTranslator(err.message));
    });
});
header.headerMenuButton.addEventListener('click', header.toggleMenu);
header.logoutLink.addEventListener('click', () => {
  logout();
  localStorage.clear();
  header.render('');
  resetSearch();
});

// search and results
function assembleCard(data, keyword) {
  const card = new Article(
    data,
    formatDate,
    keyword,
    localStorage.getItem('user'),
    mainApi,
  );
  return card.createCard();
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  articlesBlock.clearContainer();
  articlesBlock.openSection();
  articlesBlock.renderLoader();
  const query = event.target.elements[0].value;
  newsApi.getArticles(query)
    .then((res) => {
      if (!res.articles.length) {
        articlesBlock.renderError(searchErrors.badRequest);
      } else {
        const arr = [];
        const result = res.articles.slice(0, 3);
        result.forEach((item) => {
          arr.push(assembleCard(item, query));
        });
        articlesBlock.renderResults(arr);
        articlesBlock.setButtonState(res.articles.length > 3);
      }
    })
    .catch((err) => {
      articlesBlock.renderError(searchErrors.serverError);
      console.log(err);
    });
});

articlesBlock.showMoreButton.addEventListener('click', () => {
  const counter = articlesBlock.articlesContainer.children.length;
  const counter2 = counter + 3;
  const query = searchForm.elements[0].value;
  newsApi.getArticles(query)
    .then((res) => {
      const arr = [];
      const result = res.articles.slice(counter, counter2);
      result.forEach((item) => {
        arr.push(assembleCard(item, query));
      });
      articlesBlock.loadMore(arr);
      articlesBlock.setButtonState(res.articles.length > counter2);
    })
    .catch((err) => console.log(err));
});
