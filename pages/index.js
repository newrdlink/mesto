import { allElements } from "../scripts/elements.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { openPopup, editPopup } from "../scripts/utils.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
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
  //closePopup(editPopup);
}
editPopup.addEventListener("submit", popupEditHandler);
// создаем экземпляр валидации для ADD FORM
const addForm = new FormValidator(validateConfigObject, addPopup);
addForm.enableValidation();
// контейнер всех карточек
const elementContainer = document.querySelector(".elements");
// ссылка на все попапы (массив)
// const allPopup = Array.from(document.querySelectorAll(".popup"));
// установка слушателей для закрытия попапов по клику оверлей
// allPopup.forEach(function (popup) {
//   popup.addEventListener("click", function (evt) {
//     if (evt.target.classList.contains("popup")) closePopup(popup);
//   });
// });
// инициализируем стартовык карточки - перебираем стартовый массив '8'
const cardList = new Section(
  {
    items: allElements,
    renderer: (dataCard) => {
      const card = new Card(
        {
          dataCard,
          handleCardClick: () => {
            popupWithImage.open(dataCard);
          },
        },
        ".element-template"
      );
      const cardElement = card.makeCard();
      cardList.addItem(cardElement);
    },
  },
  ".elements"
);
// рендерим стартовый массив '8'
cardList.renderItems();
// создаем экземпляр для закрытия/открытия EDIT popup '8'
const editCloseOpenPopup = new Popup(".popup_function_edit");
editCloseOpenPopup.setEventListeners();
// создаем экземпляр для закрытия/открытия ADD popup '8'
const addCloseOpenPopup = new Popup(".popup_function_add-element");
addCloseOpenPopup.setEventListeners();
// создаем экземпляр для закрытия/открытия OPENED popup '8'
const openedCloseOpenPopup = new Popup(".popup_function_open-element");
openedCloseOpenPopup.setEventListeners();
// создаем экземпляр для попапа с IMAGE
const popupWithImage = new PopupWithImage(".popup_function_open-element");
popupWithImage.setEventListeners();
// добавление новой карточки '8'
function popupAddHandler() {
  const dataCard = {
    name: nameElementTarget.value,
    alt: "Фотография " + nameElementTarget.value,
    link: linkElementTarget.value,
  };

  const element = new Card(
    {
      dataCard,
      handleCardClick: () => {
        popupWithImage.open(dataCard);
      },
    },
    ".element-template"
  );
  const elementNew = element.makeCard();
  elementContainer.prepend(elementNew);
  //closePopup(addPopup);
}
addPopup.addEventListener("submit", popupAddHandler);
