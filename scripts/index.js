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

const editForm = document.querySelector(".form_function_edit");
const addForm = document.querySelector(".form_function_add-element");
const openElementForm = document.querySelector(".form_function_open-element");

const editFormOpen = document.querySelector(".profile__edit");
const addFormOpen = document.querySelector(".profile__button");

const nameTarget = document.querySelector(".profile__title");
const aboutTarget = document.querySelector(".profile__subtitle");
const nameInput = editForm.querySelector(".form__item_type_name");
const aboutInput = editForm.querySelector(".form__item_type_about");

function formAddHandler(evt) {
  evt.preventDefault();
  const nameElementTarget = document.querySelector(
    ".form__item_type_add-name-element"
  ).value;
  const altElementTarget =
    "Фотография " +
    document.querySelector(".form__item_type_add-name-element").value;
  const linkElementTarget = document.querySelector(
    ".form__item_type_add-link-element"
  ).value;
  const addedElement = {
    name: nameElementTarget,
    alt: altElementTarget,
    link: linkElementTarget,
  };
  copyElement(addedElement);
  console.log(addedElement);
  OpenCloseForm(addForm);
}

addForm.addEventListener("submit", formAddHandler);

const editFormClose = document.querySelector(
  ".form__button-close_place_edit-form"
);
const addFormClose = document.querySelector(
  ".form__button-close_place_add-element"
);
const openElementClose = document.querySelector(
  ".form__button-close_place_open-element"
);

const OpenCloseForm = function (form) {
  form.classList.toggle("form_opened");
};

editFormOpen.addEventListener("click", function () {
  if (editForm.classList.contains("form_opened") !== true)
    nameInput.value = nameTarget.textContent;
  aboutInput.value = aboutTarget.textContent;
  OpenCloseForm(editForm);
});
addFormOpen.addEventListener("click", function () {
  OpenCloseForm(addForm);
});

function formEditHandler(evt) {
  evt.preventDefault();
  nameTarget.textContent = nameInput.value;
  aboutTarget.textContent = aboutInput.value;
  OpenCloseForm(editForm);
}

editForm.addEventListener("submit", formEditHandler);

editFormClose.addEventListener("click", function () {
  OpenCloseForm(editForm);
});
addFormClose.addEventListener("click", function () {
  OpenCloseForm(addForm);
});

openElementForm
  .querySelector(".form__button-close_place_open-element")
  .addEventListener("click", function () {
    OpenCloseForm(openElementForm);
  });

function copyElement(item) {
  const element = elementTemplate.content.cloneNode(true);
  element.querySelector(".element__title").textContent = item.name;
  element.querySelector(".element__image").src = item.link;
  element.querySelector(".element__image").alt = item.alt;

  element
    .querySelector(".element__image")
    .addEventListener("click", function () {
      addContentOpenForm();
      OpenCloseForm(openElementForm);
    });

  element
    .querySelector(".element__heart")
    .addEventListener("click", function likeElement(evt) {
      evt.target.classList.toggle("element__heart_active");
    });

  element
    .querySelector(".element__basket")
    .addEventListener("click", deleteElement);

  const imageTarget = document.querySelector(".form__image");
  const imageCaptionTarget = document.querySelector(".form__image-caption");
  function addContentOpenForm() {
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
