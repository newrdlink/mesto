import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(dataCard) {
    const image = this._popup.querySelector(".popup__image");
    image.src = dataCard.link;
    image.name = dataCard.name;
    image.alt = dataCard.alt;
    this._popup.querySelector(".popup__image-caption").textContent = image.name;
    super.open();
  }
}
