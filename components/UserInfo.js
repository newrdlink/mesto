export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._nameUser = name;
    this._aboutUser = about;
    //this._avatarUser = avatar;
  }

  getUserInfo() {
    return {
      name: this._nameUser.textContent,
      about: this._aboutUser.textContent,
      //avatar: this._avatarUser.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameUser.textContent = name;
    this._aboutUser.textContent = about;
    //this._ = avatar;
  }
}
