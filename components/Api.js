export default class Api {
  constructor(options) {
    this._optins = options;
  }

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-14/cards", {
      method: "GET",
      headers: {
        authorization: "27ead031-f9f7-43be-99b7-3296b8a48ff4",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Извините, ошибка: ${res.status}`);
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
      return Promise.reject(`Извините, ошибка: ${res.status}`);
    });
    //.then((data) => console.log(data));
  }

  patchUserData({ data }) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-14/users/me", {
      method: "PATCH",
      headers: {
        authorization: "27ead031-f9f7-43be-99b7-3296b8a48ff4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Извините, ошибка: ${res.status}`);
    });
    //.then((data) => console.log(data));
  }

  addNewCard({ data }) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-14/cards", {
      method: "POST",
      headers: {
        authorization: "27ead031-f9f7-43be-99b7-3296b8a48ff4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Извините, ошибка: ${res.status}`);
    });
    //.then((data) => console.log(data));
  }

  likeCard(cardID) {}
  
  dislikeCard(cardID) {}
}
