import { openElementPopup, openPopup } from "./utils.js";
export class Card {
  constructor(name, alt, link, templateSelector) {
    this._name = name;
    this._alt = alt;
    this._link = link;
    this._templateSelector = templateSelector;
  }
  // получаем, копируем и возвращаем разметку всей карточки
  _getTemplateCard() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  // метод лайка карточки
  _handleLikeClick() {
    this._element
      .querySelector(".element__heart")
      .classList.toggle("element__heart_active");
  }
  // метод удаления карточки
  _handleRemoveCard = () => {
    this._element.remove();
    this._element = null;
  };
  // метод наполнения значений в открытом попапе
  _handleOpenCardImage() {
    const imagePopup = openElementPopup.querySelector(".popup__image");
    imagePopup.src = this._link;
    imagePopup.alt = this._alt;
    openElementPopup.querySelector(
      ".popup__image-caption"
    ).textContent = this._alt;
    openPopup(openElementPopup);
  }
  // метод установки слушателей на элементы карточки
  _setEventListeners() {
    this._element
      .querySelector(".element__heart")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });
    this._element
      .querySelector(".element__basket")
      .addEventListener("click", this._handleRemoveCard);
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenCardImage();
      });
  }
  // создаем готовую карточку (публичный метод)
  makeCard() {
    this._element = this._getTemplateCard();
    this._setEventListeners();
    const image = this._element.querySelector(".element__image");
    image.src = this._link;
    image.alt = this._alt;
    this._element.querySelector(".element__title").textContent = this._name;
    return this._element;
  }
}
