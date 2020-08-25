// Добрый день, Семен! Дело в том, что на вторую итерацию я отправил
// исправленный код, почему Вы не видите изменений, не знаю....
// отправляю работу еще раз в том же виде. Спасибо!
import "../styles/index.css";
import { allElements } from "../scripts/elements.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  nameTarget,
  aboutTarget,
  editPopupOpen,
  editPopup,
  addPopup,
  nameInput,
  aboutInput,
} from "../scripts/utils.js";
// создаем экземпляр для EDIT FORM
const editFormPopup = new PopupWithForm(".popup_function_edit", (data) => {
  userInfo.setUserInfo(data);
  editFormPopup.close();
});
editFormPopup.setEventListeners();
// создаем экземпляр для ADD FORM
const addFormPopup = new PopupWithForm(
  ".popup_function_add-element",
  (data) => {
    data = {
      name: data["name-element"],
      alt: "Фотография " + data["name-element"],
      link: data["link-element"],
    };

    const element = new Card(
      {
        data,
        handleCardClick: () => {
          popupWithImage.open(data);
        },
      },
      ".element-template"
    );
    const elementNew = element.makeCard();
    elementContainer.prepend(elementNew);
    addCloseOpenPopup.close();
  }
);
addFormPopup.setEventListeners();
// создаем экземпляр для UserInfo
const userInfo = new UserInfo({
  name: nameTarget,
  about: aboutTarget,
});
// открытие попапа EDIT
editPopupOpen.addEventListener("click", function () {
  // записываем данные USER с разметки в объект
  const infoProfile = userInfo.getUserInfo();
  // записываем данные в inputs при открытии EDIT FORM
  nameInput.value = infoProfile.name;
  aboutInput.value = infoProfile.about;
  editForm.disableButton();
  editForm.errorDisable();
  editCloseOpenPopup.open();
});
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
  addCloseOpenPopup.open();
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
// создаем экземпляр валидации для ADD FORM
const addForm = new FormValidator(validateConfigObject, addPopup);
addForm.enableValidation();
// контейнер всех карточек
const elementContainer = document.querySelector(".elements");
// инициализируем стартовык карточки - перебираем стартовый массив
const cardList = new Section(
  {
    items: allElements,
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleCardClick: () => {
            popupWithImage.open(data);
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
// рендерим стартовый массив
cardList.renderItems();
// создаем экземпляр для закрытия/открытия EDIT popup
const editCloseOpenPopup = new Popup(".popup_function_edit");
editCloseOpenPopup.setEventListeners();
// создаем экземпляр для закрытия/открытия ADD popup
const addCloseOpenPopup = new Popup(".popup_function_add-element");
addCloseOpenPopup.setEventListeners();
// создаем экземпляр для закрытия/открытия OPENED popup
const openedCloseOpenPopup = new Popup(".popup_function_open-element");
openedCloseOpenPopup.setEventListeners();
// создаем экземпляр для попапа с IMAGE
const popupWithImage = new PopupWithImage(".popup_function_open-element");
popupWithImage.setEventListeners();
