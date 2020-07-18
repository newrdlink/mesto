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

const allPopup = Array.from(document.querySelectorAll(".popup"));

const nameElementTarget = document.querySelector(
  ".popup__item_type_add-name-element"
);
const linkElementTarget = document.querySelector(
  ".popup__item_type_add-link-element"
);

allPopup.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup"))
      popup.classList.remove("popup_opened");
  });
});

function closeEscPopup(evt) {
  if (evt.key === "Escape" && popup.classList.contains("popup_opened")) {
    openClosePopup(popup);
  }
}

function closeEscapeEditForm(evt) {
  if (evt.key === "Escape") {
    openClosePopup(editPopup);
    document.removeEventListener("keydown", closeEscapeEditForm);
  }
}

function closeEscapeAddForm(evt) {
  if (evt.key === "Escape") {
    openClosePopup(addPopup);
    document.removeEventListener("keydown", closeEscapeAddForm);
  }
}

function closeEscapeOpenElementPopup(evt) {
  if (
    evt.key === "Escape" &&
    openElementPopup.classList.contains("popup_opened")
  ) {
    openClosePopup(openElementPopup);
  }
}

function popupAddHandler(evt) {
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
const openElementClose = document.querySelector(
  ".popup__button-close_place_open-element"
);
const openClosePopup = function (popup) {
  popup.classList.toggle("popup_opened");
};

editPopupOpen.addEventListener("click", function () {
  nameInput.value = nameTarget.textContent;
  aboutInput.value = aboutTarget.textContent;

  openClosePopup(editPopup);
  document.addEventListener("keydown", closeEscapeEditForm);
});

addPopupOpen.addEventListener("click", function () {
  nameElementTarget.value = "";
  linkElementTarget.value = "";
  openClosePopup(addPopup);
  document.addEventListener("keydown", closeEscapeAddForm);
});

function popupEditHandler(evt) {
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

function createCard(item) {
  const element = elementTemplate.content.cloneNode(true);
  element.querySelector(".element__title").textContent = item.name;
  element.querySelector(".element__image").src = item.link;
  element.querySelector(".element__image").alt = item.alt;
  element
    .querySelector(".element__image")
    .addEventListener("click", function () {
      addContentOpenPopup();
      openClosePopup(openElementPopup);
    });
  document.addEventListener("keydown", closeEscapeOpenElementPopup);
  element
    .querySelector(".element__heart")
    .addEventListener("click", function likeElement(evt) {
      evt.target.classList.toggle("element__heart_active");
    });
  element
    .querySelector(".element__basket")
    .addEventListener("click", deleteElement);

  const imageTarget = document.querySelector(".popup__image");
  const imageCaptionTarget = document.querySelector(".popup__image-caption");

  function addContentOpenPopup() {
    imageTarget.src = item.link;
    imageCaptionTarget.textContent = item.alt;
  }

  function deleteElement(evt) {
    const element = evt.target.closest(".element");
    element.remove();
  }
  allElements.prepend(element);
}

initialElements.forEach(function (item) {
  createCard(item);
});
