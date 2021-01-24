import './styles/index.css';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import Header from './js/components/Header';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import { mainApiConfig } from './js/constants/apiConfigs';
import { errorTexts } from './js/constants/errors';
import { errorsTranslator } from './js/utils/helpers';

import {
  popupSelectors,
  formSelectors,
  headerSelectors,
} from './js/constants/indexSelectors';

// classes instances
const popup = new Popup(popupSelectors);
const signInForm = new Form(formSelectors.signInForm, errorTexts);
const signUpForm = new Form(formSelectors.signUpForm, errorTexts);
const mainApi = new MainApi(mainApiConfig);
const header = new Header(headerSelectors);

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
});

header.render(localStorage.getItem('user'));
