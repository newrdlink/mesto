import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(data) {
    const image = this._popup.querySelector(".popup__image");
    image.src = data.link;
    image.name = data.name;
    image.alt = "Фотография " + data.name;
    this._popup.querySelector(".popup__image-caption").textContent = image.name;
    super.open();
  }
}
