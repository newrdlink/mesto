export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }
  // метод установки ошибки для input
  _setError(input, errorMessage) {
    const errorPlace = this._form.querySelector(`#${input.name}-error`);
    input.classList.add(this._inputErrorClass);
    errorPlace.textContent = errorMessage;
    errorPlace.classList.add(this._errorClass);
  }
  // метод выключения ошибки для input (снимаем красный цвет и выключаем ошибку)
  _disableError(input) {
    const errorPlace = this._form.querySelector(`#${input.name}-error`);
    input.classList.remove(this._inputErrorClass);
    errorPlace.textContent = "";
    errorPlace.classList.remove(this._errorClass);
  }
  // метод проверки input на валидность
  _checkInput(input) {
    const inputIsValid = input.validity.valid;
    if (inputIsValid) {
      this._disableError(input);
    } else {
      const errorMessage = input.validationMessage;
      this._setError(input, errorMessage);
    }
  }
  // метод проверки на наличие невалидного input
  _hasInvalidInput() {
    return this._inputAll.every((input) => {
      return input.validity.valid;
    });
  }
  // метод переключения вида input при валидации
  _toggleButtonState() {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }
  // метод установки обработчиков на input
  _setInputListeners() {
    this._inputAll = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._toggleButtonState();
    this._inputAll.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInput(input);
        this._toggleButtonState();
      });
    });
  }
  // // метод блокировки кнопки Submit
  disableButton() {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }
  // метод изменения контента кнокпи при сохранении
  renameButtonSubmit() {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    buttonElement.textContent = "Сохранение ...";
    this._toggleButtonState();
  }
  // метод изменения контента кнокпи при сохранении
  renameButtonSubmitBack() {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    buttonElement.textContent = "Сохранить";
  }
  // метод блокирования inputs при сабмите
  disableInputs() {
    const inputs = this._form.querySelectorAll(this._inputSelector);
    inputs.forEach((item) => {
      item.disabled = true;
    });
  }
  // метод разблокировки inputs
  enableInputs() {
    const inputs = this._form.querySelectorAll(this._inputSelector);
    inputs.forEach((item) => {
      item.disabled = false;
    });
  }
  // метод очистки ошибок полей
  errorDisable() {
    const inputs = this._form.querySelectorAll(this._inputSelector);
    const errors = this._form.querySelectorAll(`${this._inputSelector}-error`);
    inputs.forEach((item) => {
      item.classList.remove(this._inputErrorClass);
    });
    errors.forEach((item) => {
      item.textContent = "";
      item.classList.remove(this._errorClass);
    });
  }
  // метод запуска валидации и отключение отправки submit
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setInputListeners();
  }
}
