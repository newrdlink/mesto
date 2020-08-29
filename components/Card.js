export default class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleLikeCardClick,
      handleDeleteCardClick,
      handleDislikeCardClick,
      userInfo,
    },
    templateSelector
  ) {
    this._name = data.name;
    this._alt = `Фотография  ${data.name}`;
    this._link = data.link;
    this._id = data._id; // айдишник карточки
    this._likes = data.likes;
    this._ownerId = data.owner._id; // айдишник юзера
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleLikeCardClick = handleLikeCardClick;
    this._handleDislikeCardClick = handleDislikeCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._userInfo = userInfo;
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
  // метод изменения кол-во лайков в DOM дереве
  updateLikesCard(likes) {
    this._likes = likes;
    this._likesCardSee();
  }
  // метод удаления карточки
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  // метод скрытия кнопки удаления, если не мы ее создали
  _hideBasketButton() {
    if (this._ownerId !== this._userInfo._id) {
      this._element
        .querySelector(".element__basket")
        .classList.add("element__basket_hidden");
    }
  }
  // метод отображения кол-во лайков карточки
  _likesCardSee() {
    this._element.querySelector(
      ".element__number-likes"
    ).textContent = this._likes.length;
  }
  // метод добавления лайка, если она лайкнута ранее
  _ifCardWasLiked() {
    const userIdArray = this._likes.map((el) => {
      return el._id;
    });
    if (userIdArray.some((item) => item == this._userInfo._id)) {
      this._handleLikeClick();
    }
  }
  // метод установки слушателей на элементы карточки
  _setEventListeners() {
    const like = this._element.querySelector(".element__heart");
    this._hideBasketButton();
    like.addEventListener("click", () => {
      this._handleLikeClick();
      this._hideBasketButton();
      if (!like.classList.contains("element__heart_active")) {
        this._handleDislikeCardClick();
      } else {
        this._handleLikeCardClick();
      }
    });
    this._element
      .querySelector(".element__basket")
      .addEventListener("click", () => {
        this._handleDeleteCardClick();
      });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
  // создаем готовую карточку
  makeCard() {
    this._element = this._getTemplateCard();
    this._setEventListeners();
    this._likesCardSee();
    this._ifCardWasLiked();
    const image = this._element.querySelector(".element__image");
    image.src = this._link;
    image.alt = this._alt;
    this._element.querySelector(".element__title").textContent = this._name;
    return this._element;
  }
}
