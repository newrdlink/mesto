const initialElements = [
  {
    name: "Архыз",
    alt: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    alt: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    alt: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    alt: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    alt: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    alt: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
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

function popupAddHandler(evt) {
  evt.preventDefault();
  const nameElementTarget = document.querySelector(
    ".popup__item_type_add-name-element"
  ).value;
  const altElementTarget =
    "Фотография " +
    document.querySelector(".popup__item_type_add-name-element").value;
  const linkElementTarget = document.querySelector(
    ".popup__item_type_add-link-element"
  ).value;
  const addedElement = {
    name: nameElementTarget,
    alt: altElementTarget,
    link: linkElementTarget,
  };
  copyElement(addedElement);
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
  if (!editPopup.classList.contains("popup_opened"))
    nameInput.value = nameTarget.textContent;
  aboutInput.value = aboutTarget.textContent;
  openClosePopup(editPopup);
});

addPopupOpen.addEventListener("click", function () {
  openClosePopup(addPopup);
});

function popupEditHandler(evt) {
  evt.preventDefault();
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
//////////////////////////////////////////////////////////////////
function copyElement(item) {
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
  copyElement(item);
});
