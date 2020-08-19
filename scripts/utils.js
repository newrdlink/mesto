// ссылка на попап EDIT
const editPopup = document.querySelector(".popup_function_edit");
// ссылка на попап с картинкой
const openElementPopup = document.querySelector(".popup_function_open-element");
// функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEscPopup(popup));
};
// функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEscPopup(popup));
};
// функция закрытия попапа при нажатии по ESC
const closeEscPopup = (popup) => (evt) => {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
};
// слушатель для закрытия попапа по ESC
document.addEventListener("keydown", closeEscPopup(openElementPopup));
export { editPopup, openElementPopup, openPopup, closePopup };
