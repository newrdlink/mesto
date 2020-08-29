export default class Api {
  constructor({ address }) {
    this._address = address;
    this._groupId = "cohort-14";
    this._token = "27ead031-f9f7-43be-99b7-3296b8a48ff4";
  }

  getAppStartInfo() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Извините, ошибка: ${res.status}`);
    });
  }

  getUserData() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Извините, ошибка: ${res.status}`);
    });
  }

  patchUserData({ data }) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
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
  }

  addNewCard({ data }) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
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
  }

  changeAvatar({ data }) {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Извините, ошибка: ${res.status}`);
    });
  }

  removeCard(cardID) {
    return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Извините, ошибка: ${res.status}`);
    });
  }

  likeCard(cardID) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Извините, ошибка: ${res.status}`);
    });
  }
  dislikeCard(cardID) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Извините, ошибка: ${res.status}`);
    });
  }
}
