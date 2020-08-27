import "../styles/index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  nameTarget,
  aboutTarget,
  editPopupOpen,
  editPopup,
  addPopup,
  nameInput,
  aboutInput,
  avatarButtonEdit,
  quantityLikesCard,
} from "../scripts/utils.js";
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
// создаем экземпляр для закрытия/открытия EDIT popup
const popupWithQuestion = new Popup(".popup_function_question");
popupWithQuestion.setEventListeners();
//создаем экземпляр API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co",
  headers: {
    authorization: "27ead031-f9f7-43be-99b7-3296b8a48ff4",
    "Content-Type": "application/json",
  },
});
// рендерим загруженный массив
api.getInitialCards().then((cardListBackend) => {
  console.log(cardListBackend[1].likes);
  const cardList = new Section(
    {
      items: cardListBackend,
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
  cardList.renderItems();
});
api.getUserData().then((userInfoBackend) => {
  userInfo.setUserInfo(userInfoBackend);
});
// создаем экземпляр для EDIT FORM
const editFormPopup = new PopupWithForm(".popup_function_edit", (data) => {
  userInfo.setUserInfo(data);
  api.patchUserData({ data });
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
    api.addNewCard({ data });
    console.log(data);
    addCloseOpenPopup.close();
  }
);
addFormPopup.setEventListeners();
