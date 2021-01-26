export default class ArticlesContainer {
  constructor(selectors) {
    this.resultsShell = selectors.resultsShell;
    this.preloaderBlock = selectors.preloaderBlock || null;
    this.failBlock = selectors.failBlock || null;
    this.failTitle = selectors.failTitle || null;
    this.articlesSection = selectors.articlesSection;
    this.articlesContainer = selectors.articlesContainer;
    this.showMoreButton = selectors.showMoreButton || null;
  }

  openSection() {
    this.resultsShell.classList.add('results_state-shown');
  }

  closeSection() {
    this.resultsShell.classList.remove('results_state-shown');
  }

  addArticle(article) {
    this.articlesContainer.appendChild(article);
  }

  renderResults(array) {
    if (this.preloaderBlock) {
      this.preloaderBlock.classList.remove('results__preloader_state-shown');
    }
    this.articlesSection.classList.add('results__articles_state-shown');
    this.loadMore(array);
    if (this.showMoreButton) {
      this.setButtonState(array);
    }
  }

  setButtonState(cond) {
    if (cond) {
      this.showMoreButton.classList.add('results__expand_state-shown');
      this.showMoreButton.removeAttribute('disabled');
    } else {
      this.showMoreButton.classList.remove('results__expand_state-shown');
      this.showMoreButton.setAttribute('disabled', 'disabled');
    }
  }

  loadMore(array) {
    array.forEach((article) => {
      this.addArticle(article);
    });
  }

  renderLoader() {
    this.preloaderBlock.classList.add('results__preloader_state-shown');
  }

  renderError(message) {
    this.preloaderBlock.classList.remove('results__preloader_state-shown');
    this.failBlock.classList.add('results__fail_state-shown');
    this.failTitle.textContent = message;
  }

  clearContainer() {
    this.failBlock.classList.remove('results__fail_state-shown');
    this.articlesSection.classList.remove('results__articles_state-shown');
    const children = this.articlesContainer.querySelectorAll('.results__item');
    children.forEach((child) => {
      child.remove();
    });
  }

  resetSection() {
    this.clearContainer();
    this.closeSection();
  }
}
