const editForm = document.querySelector(".edit-form");
const editFormOpen = document.querySelector(".profile__edit");
const editFormClose = document.querySelector(
  ".button-close_position_edit-form"
);

const editFormSaveClose = editForm.querySelector(".edit-form__button");

const nameTarget = document.querySelector(".profile__title");
const aboutTarget = document.querySelector(".profile__subtitle");

const nameInput = editForm.querySelector(".edit-form__item_type_name");
const aboutInput = editForm.querySelector(".edit-form__item_type_about");

function closeEditForm() {
  editForm.classList.toggle("edit-form_opened");
  if (editForm.classList.contains("edit-form_opened")) {
    nameInput.value = nameTarget.textContent;
    aboutInput.value = aboutTarget.textContent;
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameTarget.textContent = nameInput.value;
  aboutTarget.textContent = aboutInput.value;
  closeEditForm();
}

editFormOpen.addEventListener("click", closeEditForm);
editFormClose.addEventListener("click", closeEditForm);
editForm.addEventListener("submit", formSubmitHandler);
//==============================================================================================
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

function addElement(item) {
  const element = elementTemplate.content.cloneNode(true);

  element.querySelector(".element__title").textContent = item.name;

  element.querySelector(".element__image").setAttribute("alt", item.alt);
  element.querySelector(".element__image").setAttribute("src", item.link);

  allElements.prepend(element);
}

initialElements.forEach(function (item) {
  addElement(item);
});
//=================================================================================================