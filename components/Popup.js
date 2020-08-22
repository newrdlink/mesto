export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", () => {
      this._handleEscClose();
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClickClose(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.addEventListener("click", (evt) => {
      this._handleOverlayClickClose(evt);
    });
    const closeButton = this._popup.querySelector(".popup__button-close");
    closeButton.addEventListener("click", () => this.close());
  }
}
