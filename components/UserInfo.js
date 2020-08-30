export default class UserInfo {
  constructor({ name, about, avatar, _id }, avatarContainer) {
    this._nameUser = name;
    this._aboutUser = about;
    this._avatar = avatar;
    this._id = _id;
    this._avatarContainer = avatarContainer;
  }

  getUserInfo() {
    return {
      name: this._nameUser.textContent,
      about: this._aboutUser.textContent,
      avatar: this._aboutUser,
    };
  }

  getNewCardInfo() {
    return {
      // name: this._nameUser,
      // link: 
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._nameUser.textContent = name;
    this._aboutUser.textContent = about;
    this._avatar = avatar;
    this._id = _id;
  }

  setAvatar({ avatar }) {
    this._avatarContainer.style.backgroundImage = `url(${avatar})`;
  }
}
