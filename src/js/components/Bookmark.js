export default class Bookmark {
  constructor(articleData, api) {
    this.id = articleData._id;
    this.keyword = articleData.keyword;
    this.title = articleData.title;
    this.text = articleData.text;
    this.date = articleData.date;
    this.source = articleData.source;
    this.link = articleData.link;
    this.image = articleData.image;
    this.removeHandler = api.deleteArticle;
    this.remove = this.remove.bind(this);
  }

  createBookmark() {
    const markup = `
            <div class="results__item">
              <div class="results__item-cover">
                <button class="results__icon results__icon_type-trash"></button>
                <p class="results__warning results__warning_type-delete">Убрать из сохранённых</p>
                <p class="results__keyword">Природа</p>
              </div>
              <a href="./" class="results__item-link" target="_blank">
                <div class="results__item-content">
                  <p class="results__item-date">2 августа, 2019</p>
                  <h3 class="results__item-title">Национальное достояние — парки</h3>
                  <p class="results__item-text">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.</p>
                  <p class="results__item-source">Лента.ру</p>
                </div>
              </a>
            </div>`;
    const shell = document.createElement('div');
    shell.insertAdjacentHTML('afterbegin', markup);
    const newCard = shell.firstElementChild;
    newCard.querySelector('.results__keyword').textContent = this.keyword;
    newCard.querySelector('.results__item-cover').setAttribute('style', `background-image: url(${this.image})`);
    newCard.querySelector('.results__item-link').setAttribute('href', this.link);
    newCard.querySelector('.results__item-date').textContent = this.date;
    newCard.querySelector('.results__item-title').textContent = this.title;
    newCard.querySelector('.results__item-text').textContent = this.text;
    newCard.querySelector('.results__item-source').textContent = this.source;
    this._setEventListeners(newCard);
    return newCard;
  }

  remove(event) {
    const card = event.target.closest('.results__item');
    this.removeHandler(this.id)
      .then(() => {
        card.remove();
        card.removeEventListener('click', this.remove);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners(card) {
    card.querySelector('.results__icon').addEventListener('click', this.remove);
  }
}
