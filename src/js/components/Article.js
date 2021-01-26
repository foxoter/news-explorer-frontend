export default class Article {
  constructor(articleData, dateHandler, keyword, isLoggedIn, api) {
    this.keyword = keyword;
    this.title = articleData.title;
    this.source = articleData.source.name;
    this.date = dateHandler(articleData.publishedAt);
    this.text = articleData.description;
    this.urlToImage = articleData.urlToImage || 'https://newsapi.org/images/n-logo-border.png';
    this.url = articleData.url;
    this.id = articleData._id || null;
    this.isLoggedIn = isLoggedIn;
    this.isSaved = false;
    this.saveHandler = api.saveArticle;
    this.removeHandler = api.deleteArticle;
    this.save = this.save.bind(this);
  }

  createCard() {
    const markup = `<div class="results__item">
              <div class="results__item-cover">
                <button class="results__icon" type="button"></button>
                <p class="results__warning">Войдите, чтобы сохранять статьи</p>
              </div>
              <a href="./" class="results__item-link" target="_blank">
                <div class="results__item-content">
                  <p class="results__item-date">2 августа, 2019</p>
                  <h3 class="results__item-title">Национальное достояние — парки</h3>
                  <p class="results__item-text">В 2016 году Америка </p>
                  <p class="results__item-source">Лента.ру</p>
                </div>
              </a>
            </div>`;
    const shell = document.createElement('div');
    shell.insertAdjacentHTML('afterbegin', markup);
    const newCard = shell.firstElementChild;
    newCard.querySelector('.results__item-cover').setAttribute('style', `background-image: url(${this.urlToImage})`);
    newCard.querySelector('.results__item-link').setAttribute('href', this.url);
    newCard.querySelector('.results__item-date').textContent = this.date;
    newCard.querySelector('.results__item-title').textContent = this.title;
    newCard.querySelector('.results__item-text').textContent = this.text;
    newCard.querySelector('.results__item-source').textContent = this.source;
    this.renderIcon(newCard);
    this._setEventListeners(newCard);
    return newCard;
  }

  renderIcon(card) {
    const icon = card.querySelector('.results__icon');
    if (this.isLoggedIn) {
      icon.classList.add('results__icon_type-active');
    } else {
      icon.classList.add('results__icon_type-passive');
      icon.setAttribute('disabled', 'disabled');
    }
    if (this.isSaved) {
      icon.classList.add('results__icon_type-saved');
    } else {
      icon.classList.remove('results__icon_type-saved');
    }
  }

  save(event) {
    const card = event.target.closest('.results__item');
    if (!this.isSaved) {
      const body = {
        keyword: this.keyword,
        title: this.title,
        text: this.text,
        date: this.date,
        source: this.source,
        link: this.url,
        image: this.urlToImage,
      };
      this.saveHandler(body)
        .then((res) => {
          this.id = res.article._id;
          this.toggleSavedState(card);
        })
        .catch((err) => console.log(err));
    } else {
      this.removeHandler(this.id)
        .then(() => {
          this.id = null;
          this.toggleSavedState(card);
        });
    }
  }

  toggleSavedState(card) {
    this.isSaved = !this.isSaved;
    this.renderIcon(card);
  }

  _setEventListeners(card) {
    card.querySelector('.results__icon').addEventListener('click', this.save);
  }
}
