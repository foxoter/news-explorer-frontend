import './styles/bookmarks.css';
import Header from './js/components/Header';
import MainApi from './js/api/MainApi';
import Bookmark from './js/components/Bookmark';
import { mainApiConfig } from './js/constants/apiConfigs';
import ArticlesContainer from './js/components/ArticlesContainer';
import {
  headerSelectors,
  leadSelectors,
  resultsSelectors,
} from './js/constants/bookmarksSelectors';
import { sortKeyWords } from './js/utils/helpers';

const bookmarksHeader = new Header(headerSelectors);
const mainApi = new MainApi(mainApiConfig);
const resultsBlock = new ArticlesContainer(resultsSelectors);
const userName = localStorage.getItem('user');

// guard
if (!localStorage.getItem('user')) {
  window.location.replace('./');
}

// page elements rendering
bookmarksHeader.render(localStorage.getItem('user'));
leadSelectors.userName.textContent = userName;
function assembleCard(data) {
  const bookmark = new Bookmark(data, mainApi);
  return bookmark.createBookmark();
}
function renderLead(data) {
  if (data) {
    const keys = data.articles.map((item) => item.keyword);
    const keywords = sortKeyWords(keys);
    leadSelectors.leadText.classList.add('lead__text_state-shown');
    leadSelectors.bookMarksCount.textContent = data.articles.length;
    leadSelectors.keyWordOne.textContent = `
    ${keywords[0]}${keywords[1] ? `, ${keywords[1]}` : ''}
    ${keywords[2] ? ` и ${keywords[2]} другим` : ''}`;
  }
}

// cards rendering
mainApi.getArticles()
  .then((res) => {
    const arr = [];
    res.articles.forEach((item) => {
      arr.push(assembleCard(item));
    });
    renderLead(res);
    resultsBlock.openSection();
    resultsBlock.renderResults(arr);
  })
  .catch((err) => {
    if (err.message === 'There are no articles yet...') {
      leadSelectors.leadTitle.textContent = `${userName}, у вас пока нет статей`;
      renderLead('');
    }
    console.log(err);
  });

// logout handling
bookmarksHeader.logoutLink.addEventListener('click', () => {
  mainApi.logout();
  localStorage.clear();
  bookmarksHeader.render('');
  window.location.replace('./');
});
bookmarksHeader.headerMenuButton.addEventListener('click', bookmarksHeader.toggleMenu);
