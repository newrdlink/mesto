let editForm = document.querySelector(".edit-form");
const editFormOpen = document.querySelector(".profile__edit");
const editFormClose = editForm.querySelector(".edit-form__button-close");
const editFormSaveClose = editForm.querySelector(".edit-form__button");

const editFormToggle = function (event) {
  editForm.classList.toggle("edit-form_opened");
};

const editFormCloseByOverlay = function (event) {
  console.log(event.target);
  console.log(event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  editFormToggle();
};

editFormOpen.addEventListener("click", editFormToggle);
editFormClose.addEventListener("click", editFormToggle);
editForm.addEventListener("click", editFormCloseByOverlay);
//
const nameInput = editForm.querySelector(".edit-form__name");
const jobInput = editForm.querySelector(".edit-form__about");

let name = nameInput.getAttribute("value");
let job = jobInput.getAttribute("value");

let nameTarget = document.querySelector(".profile__title");
let jobTarget = document.querySelector(".profile__subtitle");

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameTarget.textContent = nameInput.value;
  jobTarget.textContent = jobInput.value;
}

editForm.addEventListener("submit", formSubmitHandler);

editFormSaveClose.addEventListener("click", editFormToggle);
