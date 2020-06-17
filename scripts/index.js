const editForm = document.querySelector(".edit-form");
const editFormOpen = document.querySelector(".profile__edit");
const editFormClose = editForm.querySelector(".edit-form__button-close");

const editFormSaveClose = editForm.querySelector(".edit-form__button");

const nameTarget = document.querySelector(".profile__title");
const aboutTarget = document.querySelector(".profile__subtitle");

const nameInput = editForm.querySelector(".edit-form__item_type_name");
const aboutInput = editForm.querySelector(".edit-form__item_type_about");

function closePopUp() {
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
  closePopUp();
}

editFormOpen.addEventListener("click", closePopUp);
editFormClose.addEventListener("click", closePopUp);
editForm.addEventListener("submit", formSubmitHandler);
