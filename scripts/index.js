import { allElements } from "./elements.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openElementPopup, openPopup, closePopup, editPopup } from "./utils.js";
// ссылка на кнопку закрытия попапа EDIT
const editPopupClose = editPopup.querySelector(
  ".popup__button-close_place_edit-popup"
);
// слушатель на кнопку закрытия попапа EDIT
editPopupClose.addEventListener("click", function () {
  closePopup(editPopup);
});
// ссылка на кнопку открытия попапа EDIT
const editPopupOpen = document.querySelector(".profile__edit");
// ссылка на input name в EDITFORM
const nameInput = editPopup.querySelector(".popup__item_type_name");
// ссылка на TITLE в разметке
const nameTarget = document.querySelector(".profile__title");
// ссылка на input about в EDITFORM
const aboutInput = editPopup.querySelector(".popup__item_type_about");
// ссылка на SUBTITLE в разметке
const aboutTarget = document.querySelector(".profile__subtitle");
// открытие попапа EDIT
editPopupOpen.addEventListener("click", function () {
  nameInput.value = nameTarget.textContent;
  aboutInput.value = aboutTarget.textContent;
  editForm.disableButton();
  editForm.errorDisable();
  openPopup(editPopup);
});
// ссылка на попап ADD
const addPopup = document.querySelector(".popup_function_add-element");
// ссылка на кнопку открытия попапа ADD
const addPopupOpen = document.querySelector(".profile__button");
// ссылка на input name в ADDFORM
const nameElementTarget = document.querySelector(
  ".popup__item_type_add-name-element"
);
// ссылка на input link в ADDFORM
const linkElementTarget = document.querySelector(
  ".popup__item_type_add-link-element"
);
// слушатель для открытия попапа ADD
addPopupOpen.addEventListener("click", function () {
  nameElementTarget.value = "";
  linkElementTarget.value = "";
  addForm.disableButton();
  addForm.errorDisable();
  openPopup(addPopup);
});
// ссылка на кнопку закрытия попапа ADD
const addPopupClose = addPopup.querySelector(
  ".popup__button-close_place_add-element"
);
// слушатель для закрытия попапа ADD
addPopupClose.addEventListener("click", function () {
  closePopup(addPopup);
});
// объект настроек валидации
const validateConfigObject = {
  formSelector: ".popup__popup",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_visible",
};
// создаем экземпляр валидации для EDIT FORM
const editForm = new FormValidator(validateConfigObject, editPopup);
editForm.enableValidation();
// функция сохранения информации в EDIT Profile
function popupEditHandler() {
  nameTarget.textContent = nameInput.value;
  aboutTarget.textContent = aboutInput.value;
  closePopup(editPopup);
}
editPopup.addEventListener("submit", popupEditHandler);
// создаем экземпляр валидации для ADD FORM
const addForm = new FormValidator(validateConfigObject, addPopup);
addForm.enableValidation();
// контейнер всех карточек
const elementContainer = document.querySelector(".elements");
// ссылка на все попапы (массив)
const allPopup = Array.from(document.querySelectorAll(".popup"));
// ссылка на кнопку закрытияч попапа
const buttonClosePopup = openElementPopup.querySelector(
  ".popup__button-close_place_open-element"
);
// слушатель на кнопку закрытия
buttonClosePopup.addEventListener("click", function () {
  closePopup(openElementPopup);
});
// установка слушателей для закрытия попапов по клику оверлей
allPopup.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) closePopup(popup);
  });
});
// перебираем стартовый массив
allElements.forEach((item) => {
  const card = new Card(item.name, item.alt, item.link, ".element-template");
  const cardElement = card.makeCard();
  elementContainer.prepend(cardElement);
});
// добавление новой карточки
function popupAddHandler() {
  const element = new Card(
    nameElementTarget.value,
    "Фотография " + nameElementTarget.value,
    linkElementTarget.value,
    ".element-template"
  );
  const elementNew = element.makeCard();
  elementContainer.prepend(elementNew);
  closePopup(addPopup);
}
addPopup.addEventListener("submit", popupAddHandler);
