export default class UserInfo {
  constructor({ name, about, avatar }, avatarContainer) {
    this._nameUser = name;
    this._aboutUser = about;
    this._avatar = avatar;
    this._avatarContainer = avatarContainer;
  }

  getUserInfo() {
    return {
      name: this._nameUser.textContent,
      about: this._aboutUser.textContent,
      avatar: this._aboutUser,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameUser.textContent = name;
    this._aboutUser.textContent = about;
    this._avatar = avatar;
  }

  setAvatar({ avatar }) {
    this._avatarContainer.style.backgroundImage = `url(${avatar})`;
  }
}
