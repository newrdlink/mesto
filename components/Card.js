export default class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._alt = `Фотография  ${data.name}`;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
  _handleRemoveCard(evt) {
    this._element.remove();
    this._element = null;
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
      .addEventListener("click", (evt) => {
        this._handleRemoveCard(evt);
      });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
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
