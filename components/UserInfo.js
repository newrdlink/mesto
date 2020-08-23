export default class UserInfo {
  constructor({ name, about }) {
    this._nameUser = name;
    this._aboutUser = about;
  }

  getUserInfo() {
    return {
      name: this._nameUser.textContent,
      about: this._aboutUser.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameUser.textContent = name;
    this._aboutUser.textContent = about;
  }
}
