export default class Api {
  constructor(options) {
    this._optins = options;
  }

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-14/cards", {
      method: "GET",
      headers: {
        authorization: "27ead031-f9f7-43be-99b7-3296b8a48ff4",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошиbбка: ${res.status}`);
    });
    //.then((data) => console.log(data));
  }

  getUserData() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-14/users/me", {
      method: "GET",
      headers: {
        authorization: "27ead031-f9f7-43be-99b7-3296b8a48ff4",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошиbбка: ${res.status}`);
    });
    //.then((data) => console.log(data));
  }
}
