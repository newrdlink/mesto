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
  editAvatar,
  nameInput,
  aboutInput,
  avatarButtonEdit,
  quantityLikesCard,
  avatarInput,
} from "../scripts/utils.js";

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
// объект настроек валидации
const validateConfigObject = {
  formSelector: ".popup__popup",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_visible",
};
// создаем экземпляр валидации и запускаем для EDIT FORM
const editForm = new FormValidator(validateConfigObject, editPopup);
editForm.enableValidation();
// создаем экземпляр валидации и запускаем для ADD FORM
const addForm = new FormValidator(validateConfigObject, addPopup);
addForm.enableValidation();
// создаем экземпляр валидации и запускаем для EDIT FORM
const editFormAvatar = new FormValidator(validateConfigObject, editAvatar);
editFormAvatar.enableValidation();
// контейнер всех карточек
const elementContainer = document.querySelector(".elements");
//создаем экземпляр API
const api = new Api({
  address: "https://mesto.nomoreparties.co/v1",
});
// на основе вебинара //
api
  .getAppStartInfo()
  .then((res) => {
    const [userInfoBackend, cardsBackend] = res;
    // создаем экземпляр для UserInfo
    const userInfo = new UserInfo({
      name: nameTarget,
      about: aboutTarget,
      //avatar: avatarButtonEdit,
    });
    // вставляем данные юзера из полученных с сервера
    userInfo.setUserInfo(userInfoBackend);
    // создаем экземпляр для попапа с вопросос об удалении
    const popupWithQuestion = new Popup(".popup_function_question");
    popupWithQuestion.setEventListeners();
    // создаем экземпляр для попапа с IMAGE
    const popupWithImage = new PopupWithImage(".popup_function_open-element");
    //
    const cardList = new Section(
      {
        items: cardsBackend,
        renderer: (data) => {
          const card = new Card(
            {
              data,
              handleCardClick: () => {
                popupWithImage.open(data);
              },
              handleLikeCardClick: () => {
                api.likeCard(card._id).then((telo) => {
                  card.updateLikesCard(telo.likes);
                });
              },
              handleDislikeCardClick: () => {
                api.dislikeCard(card._id).then((telo) => {
                  card.updateLikesCard(telo.likes);
                });
              },
              handleDeleteCardClick: () => {
                popupWithQuestion.open();
                const popupWithQuestionForm = new PopupWithForm(
                  ".popup_function_question",
                  () => {
                    api
                      .removeCard(data._id)
                      .then(() => {
                        card.removeCard();
                      })
                      .catch((err) => console.error(err));
                    popupWithQuestionForm.close();
                  }
                );
                popupWithQuestionForm.setEventListeners();
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
    return {
      userInfo,
      userInfoBackend,
      cardsBackend,
      popupWithImage,
    };
  })
  .then((res) => {
    const { userInfo, userInfoBackend, cardsBackend, popupWithImage } = res;
    //
    const editAvatarCloseOpenPopup = new Popup(".popup_function_edit-avatar");
    editAvatarCloseOpenPopup.setEventListeners();
    // открытие попапа для редактирования аватара
    avatarButtonEdit.addEventListener("click", () => {
      editAvatarCloseOpenPopup.open();
      avatarInput.value = "";
      editFormAvatar.errorDisable();
    });
    // создаем экземпляр для закрытия/открытия ADD popup
    const addCloseOpenPopup = new Popup(".popup_function_add-element");
    addCloseOpenPopup.setEventListeners();
    popupWithImage.setEventListeners();
    // создаем экземпляр для закрытия/открытия OPENED popup
    const openedCloseOpenPopup = new Popup(".popup_function_open-element");
    openedCloseOpenPopup.setEventListeners();
    // слушатель для открытия попапа ADD
    addPopupOpen.addEventListener("click", function () {
      nameElementTarget.value = "";
      linkElementTarget.value = "";
      addForm.disableButton();
      addForm.errorDisable();
      addCloseOpenPopup.open();
    });
    // создаем экземпляр для ADD FORM
    const addFormPopup = new PopupWithForm(
      ".popup_function_add-element",
      (data) => {
        data = {
          name: data["name-element"],
          alt: "Фотография " + data["name-element"],
          link: data["link-element"],
          likes: [],
          _id: "",
          owner: {
            _id: "cda20084ce007870e1f6050a",
          },
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
        addCloseOpenPopup.close();
      }
    );
    addFormPopup.setEventListeners();
    return { userInfo, openedCloseOpenPopup };
  })
  .then((res) => {
    const { userInfo, openedCloseOpenPopup } = res;
    // создаем экземпляр для закрытия/открытия EDIT popup
    const editCloseOpenPopup = new Popup(".popup_function_edit");
    editCloseOpenPopup.setEventListeners();
    // открытие попапа EDIT
    editPopupOpen.addEventListener("click", function () {
      // записываем данные USER с разметки в объект
      const infoProfile = userInfo.getUserInfo();
      // записываем данные в inputs при открытии EDIT FORM
      nameInput.value = infoProfile.name;
      aboutInput.value = infoProfile.about;
      editForm.renameButtonSubmitBack();
      editForm.enableInputs();
      editForm.disableButton();
      editForm.errorDisable();
      editCloseOpenPopup.open();
    });
    // создаем экземпляр для EDIT FORM
    const editFormPopup = new PopupWithForm(".popup_function_edit", (data) => {
      userInfo.setUserInfo(data);
      api.patchUserData({ data });
      editForm.disableButton();
      editForm.disableInputs();
      editForm.renameButtonSubmit();
      setTimeout(() => {
        editFormPopup.close();
      }, 1000);
    });
    editFormPopup.setEventListeners();
  })
  .catch((err) => console.error(err));
console.log("Это все");
