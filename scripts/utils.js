// ссылка на попап EDIT
const editPopup = document.querySelector(".popup_function_edit");
// функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

export { editPopup, openPopup };
