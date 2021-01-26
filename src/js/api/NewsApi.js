export default class NewsApi {
  constructor(config) {
    this.url = config.url;
    this.pageSize = config.pageSize;
    this.apiKey = config.apiKey;
    this.lang = config.lang;
    this.from = config.from;
    this.to = config.to;
  }

  getArticles(keyword) {
    const requestUrl = [
      this.url,
      `?q=${keyword}`,
      `&from=${this.from}`,
      `&to=${this.to}`,
      `&language=${this.lang}`,
      '&sortBy=publishedAt',
      `&pageSize=${this.pageSize}`,
      `&apiKey=${this.apiKey}`,
    ].join('');
    return fetch(requestUrl)
      .then((res) => {
        if (!res.ok) {
          return res.json()
            .then((err) => Promise.reject(err));
        }
        return res.json();
      })
      .catch((err) => {
        throw err;
      });
  }
}
