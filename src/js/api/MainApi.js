export default class MainApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
    this.saveArticle = this.saveArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  signup(body) {
    return fetch(`${this.url}signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(body),
    })
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

  signin(body) {
    return fetch(`${this.url}signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(body),
    })
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

  getUser() {
    return fetch(`${this.url}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    })
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

  logout() {
    return fetch(`${this.url}logout`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
    })
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

  getArticles() {
    return fetch(`${this.url}articles`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    })
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

  saveArticle(body) {
    return fetch(`${this.url}articles`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(body),
    })
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

  deleteArticle(id) {
    return fetch(`${this.url}articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers,
    })
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
