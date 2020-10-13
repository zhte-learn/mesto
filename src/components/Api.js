export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  }

  getAllCards() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }

  getUserData() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }
  
  addNewCard(data) {
    return fetch(this._url, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }

  updateUserData(data) {
    return fetch(this._url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}/${id}`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }

  addLike(id) {
    return fetch(`${this._url}/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
  })
  .then((res) => {
    return this._handleResult(res);
    })
  }

  deleteLike(id) {
    return fetch(`${this._url}/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }

  updateAvatar(link) {
    return fetch(`${this._url}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar: link}),
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }
}