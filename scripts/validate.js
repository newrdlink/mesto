const editPopupOpen = document.querySelector(".profile__edit");
const validateObject = {
  formSelector: ".popup__popup",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_visible",
};

function enableValidation({ formSelector, ...rest }) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setInputListeners(form, rest);
  });
}

function setInputListeners(
  form,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
) {
  const inputAll = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);

  toggleButtonState(inputAll, buttonElement, inactiveButtonClass);

  inputAll.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInput(input, rest);
      toggleButtonState(inputAll, buttonElement, inactiveButtonClass);
    });
  });
}

function toggleButtonState(inputAll, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputAll)) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  } else {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  }
}

function hasInvalidInput(inputAll) {
  return inputAll.every(function (input) {
    return input.validity.valid;
  });
}

function checkInput(input, rest) {
  const inputIsValid = input.validity.valid;
  if (inputIsValid) {
    disableError(input, rest);
  } else {
    const errorMessage = input.validationMessage;
    setError(input, errorMessage, rest);
  }
}

function setError(
  input,
  errorMessage,
  { inputErrorClass, errorClass, ...rest }
) {
  const errorPlace = getErrorPlace(input);
  input.classList.add(inputErrorClass);
  errorPlace.textContent = errorMessage;
  errorPlace.classList.add(errorClass);
}

function getErrorPlace(input) {
  const inputName = input.getAttribute("name");
  return document.getElementById(`${inputName}-error`);
}

function disableError(input, { inputErrorClass, errorClass, ...rest }) {
  const errorPlace = getErrorPlace(input);
  input.classList.remove(inputErrorClass);
  errorPlace.textContent = "";
  errorPlace.classList.remove(errorClass);
}

enableValidation(validateObject);
