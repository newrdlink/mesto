// ссылка на попап EDIT
const editPopup = document.querySelector(".popup_function_edit");
// ссылка на попап ADD
const addPopup = document.querySelector(".popup_function_add-element");
// ссылка на попап EDIT AVATAR
const editAvatar = document.querySelector(".popup_function_edit-avatar");
// ссылка на input в EDIT AVATAR
const avatarInput = editAvatar.querySelector(".popup__item_type_name");
// ссылка на кнопку открытия попапа EDIT
const editPopupOpen = document.querySelector(".profile__edit");
// ссылка на input name в EDITFORM
const nameInput = editPopup.querySelector(".popup__item_type_name");
// ссылка на TITLE в разметке
const nameTarget = document.querySelector(".profile__title");
// ссылка на input about в EDITFORM
const aboutInput = editPopup.querySelector(".popup__item_type_about");
// ссылка на SUBTITLE в разметке
const aboutTarget = document.querySelector(".profile__subtitle");
// ссылка на кнопку обновить аватар
const avatarButtonEdit = document.querySelector(".profile__image");

export {
  nameTarget,
  aboutTarget,
  editPopupOpen,
  editPopup,
  addPopup,
  editAvatar,
  nameInput,
  aboutInput,
  avatarButtonEdit,
  avatarInput,
};
