import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
  // получаем данные с inputs формы
  _getInputValues() {
    this._inputs = Array.from(this._form.querySelectorAll(".popup__item"));
    this._inputsItem = {};
    this._inputs.forEach((item) => {
      this._inputsItem[item.name] = item.value;
    });
    return this._inputsItem;
  }
  // установка обработчиков
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._handleFormSubmit(data);
    });
  }

  close() {
    super.close();
  }
}
