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
///////////////////////////////////////////////////////////// ссылка на список всех элементов в разметке
const allElements = document.querySelector(".elements");
/////////////////////////////////////////////////////////////////////// ссылка на шаблон карточки/элемента
const elementTemplate = document.querySelector(".element-template");
//////////////////////////////////////////////////////////////////// ссылки на три формы
const editForm = document.querySelector(".form_function_edit");
const addForm = document.querySelector(".form_function_add-element");
const openElementForm = document.querySelector(".form_function_open-element");
/////////////////////////////////////////////////////// создаем три переменных для ссылки на кнопки открытия форм
const editFormOpen = document.querySelector(".profile__edit");
const addFormOpen = document.querySelector(".profile__button");
//////////////////////////////////////////// делаем ссылки на контент с разметки и для конечных input для edit Form
const nameTarget = document.querySelector(".profile__title");
const aboutTarget = document.querySelector(".profile__subtitle");
const nameInput = editForm.querySelector(".form__item_type_name");
const aboutInput = editForm.querySelector(".form__item_type_about");
//////////////////////////////////////////////////////// функция для кнопки submit для add form
function formAddHandler(evt) {
  evt.preventDefault();
  const nameElementTarget = document.querySelector(
    ".form__item_type_add-name-element"
  ).value;
  const altElementTarget = document.querySelector(
    ".form__item_type_add-name-element"
  ).value;
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
//////////////////////////////////////////////////////// обработчик события/слушатель для submit в add form
addForm.addEventListener("submit", formAddHandler);
///////////////////////////////////////////////////////// создаем три ссылки на кнопки закрытия форм
const editFormClose = document.querySelector(
  ".form__button-close_place_edit-form"
);
const addFormClose = document.querySelector(
  ".form__button-close_place_add-element"
);
const openElementClose = document.querySelector(
  ".form__button-close_place_open-element"
);
///////////////////////////////////////////////////////// создаем функцию закрытия/открытия формы
const OpenCloseForm = function (form) {
  form.classList.toggle("form_opened");
};
///////////////////////////////////////////////////////// делаем два/три слушателя для кнопки открытия
editFormOpen.addEventListener("click", function () {
  if (editForm.classList.contains("form_opened") !== true)
    nameInput.value = nameTarget.textContent;
  aboutInput.value = aboutTarget.textContent;
  OpenCloseForm(editForm);
});
addFormOpen.addEventListener("click", function () {
  OpenCloseForm(addForm);
});
//////////////////////////////////////////////////////// функция для кнопки submit для edit form
function formEditHandler(evt) {
  evt.preventDefault();
  nameTarget.textContent = nameInput.value;
  aboutTarget.textContent = aboutInput.value;
  OpenCloseForm(editForm);
}
//////////////////////////////////////////////////////// обработчик события/слушатель для submit в edit form
editForm.addEventListener("submit", formEditHandler);
//////////////////////////////////////////////////////// делаем трех слушателей для закрытия форм
editFormClose.addEventListener("click", function () {
  OpenCloseForm(editForm);
});
addFormClose.addEventListener("click", function () {
  OpenCloseForm(addForm);
});
// слушатель для закрытия третего попапа
openElementForm
  .querySelector(".form__button-close_place_open-element")
  .addEventListener("click", function () {
    OpenCloseForm(openElementForm);
  });
///////////////////////////////////////////////////////// функция, которая копирует карточку
function copyElement(item) {
  const element = elementTemplate.content.cloneNode(true);
  element.querySelector(".element__title").textContent = item.name;
  element.querySelector(".element__image").src = item.link;
  element.querySelector(".element__image").alt = item.alt;
  // слушатель для открытия третего попапа
  element
    .querySelector(".element__image")
    .addEventListener("click", function () {
      OpenCloseForm(openElementForm);
    });
  allElements.prepend(element);
}
// рендерим все карточки/елементы
initialElements.forEach(function (item) {
  copyElement(item);
});
