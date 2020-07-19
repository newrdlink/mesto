// Добрый день, Алексей!
// Поскольку сегодня дэдлайн по работе, то я пока исправил только то,
// что в Ваших коментариях помечено как "НАДО ИСПРАВИТЬ".
// По ходу дня постараюсь сделать те вещи, которые помечены Вами "можно лучше"
// в общем комментарии, и буду перезаливать работу. Спасибо!

import { initialElements } from "./elements.js";

const allElements = document.querySelector(".elements");
const elementTemplate = document.querySelector(".element-template");

const editPopup = document.querySelector(".popup_function_edit");
const addPopup = document.querySelector(".popup_function_add-element");
const openElementPopup = document.querySelector(".popup_function_open-element");

const editPopupOpen = document.querySelector(".profile__edit");
const addPopupOpen = document.querySelector(".profile__button");

const nameTarget = document.querySelector(".profile__title");
const aboutTarget = document.querySelector(".profile__subtitle");

const nameInput = editPopup.querySelector(".popup__item_type_name");
const aboutInput = editPopup.querySelector(".popup__item_type_about");

const imageTarget = document.querySelector(".popup__image");
const imageCaptionTarget = document.querySelector(".popup__image-caption");

const allPopup = Array.from(document.querySelectorAll(".popup"));

const nameElementTarget = document.querySelector(
  ".popup__item_type_add-name-element"
);
const linkElementTarget = document.querySelector(
  ".popup__item_type_add-link-element"
);
// ***функция закрытия попапов по клавише ESC*** // - 1; 2
const closeEscPopup = (popup) => (evt) => {
  if (evt.key === "Escape" && popup.classList.contains("popup_opened")) {
    openClosePopup(popup);
    document.removeEventListener("keydown", closeEscPopup(popup));
  }
};

allPopup.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup"))
      popup.classList.remove("popup_opened");
  });
});

function popupAddHandler() {
  const addedElement = {
    name: nameElementTarget.value,
    alt: "Фотография " + nameElementTarget.value,
    link: linkElementTarget.value,
  };
  createCard(addedElement);
  openClosePopup(addPopup);
}

addPopup.addEventListener("submit", popupAddHandler);

const editPopupClose = document.querySelector(
  ".popup__button-close_place_edit-popup"
);
const addPopupClose = document.querySelector(
  ".popup__button-close_place_add-element"
);
const openClosePopup = function (popup) {
  popup.classList.toggle("popup_opened");
};

editPopupOpen.addEventListener("click", function () {
  nameInput.value = nameTarget.textContent;
  aboutInput.value = aboutTarget.textContent;
  openClosePopup(editPopup);
  document.addEventListener("keydown", closeEscPopup(editPopup)); // слушатель для закрытия по ESC
});

addPopupOpen.addEventListener("click", function () {
  nameElementTarget.value = "";
  linkElementTarget.value = "";
  openClosePopup(addPopup);
  document.addEventListener("keydown", closeEscPopup(addPopup)); // слушатель для закрытия по ESC
});

function popupEditHandler() {
  nameTarget.textContent = nameInput.value;
  aboutTarget.textContent = aboutInput.value;
  openClosePopup(editPopup);
}
editPopup.addEventListener("submit", popupEditHandler);

editPopupClose.addEventListener("click", function () {
  openClosePopup(editPopup);
});
addPopupClose.addEventListener("click", function () {
  openClosePopup(addPopup);
});

openElementPopup
  .querySelector(".popup__button-close_place_open-element")
  .addEventListener("click", function () {
    openClosePopup(openElementPopup);
  });

// функция удаления карточки - 3
function deleteElement(evt) {
  const element = evt.target.closest(".element");
  element.remove();
}

// функция добавления ссылки и title карточки - 3
function addContentOpenPopup(item) {
  imageTarget.src = item.link;
  imageCaptionTarget.textContent = item.alt;
}
// Функция добавления карточек - 5
function addCard(element, allElements) {
  allElements.prepend(element);
  return element;
}

function createCard(item) {
  const element = elementTemplate.content.cloneNode(true);
  const elementImage = element.querySelector(".element__image"); // - 4

  element.querySelector(".element__title").textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.alt;
  elementImage.addEventListener("click", function () {
    addContentOpenPopup(item);
    openClosePopup(openElementPopup);
  });
  document.addEventListener("keydown", closeEscPopup(openElementPopup)); // слушатель для закрытия по ESC
  element
    .querySelector(".element__heart")
    .addEventListener("click", function likeElement(evt) {
      evt.target.classList.toggle("element__heart_active");
    });
  element
    .querySelector(".element__basket")
    .addEventListener("click", deleteElement);
  addCard(element, allElements);
}

initialElements.forEach(function (item) {
  createCard(item);
});
