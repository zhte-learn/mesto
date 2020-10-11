export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getAllCards() {
    const promise = fetch(this._url, {
      method: 'GET',
      headers: this._headers
    });
    
    const secondPromise = promise.then((res) => {
      return res.json();
    });
    
    return secondPromise;
  }

  getData() {
    return fetch(this._url, {
        headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject("Произошла ошибка");
    })
    .catch((err) => {
      console.log('Ошибка');
    });
  }

  addNewCard(data) {
    return fetch(this._url, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.ok) {
          
          return res.json();
        }

        return Promise.reject("Произошла ошибка");
    });
  }

  patchData(data) {
    return fetch(this._url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
  }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка");
  });
  }

  delete(id) {
    return fetch(`${this._url}/${id}`, {
        method: "DELETE",
        headers: this._headers,
    }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("Произошла ошибка");
    });
  }
}