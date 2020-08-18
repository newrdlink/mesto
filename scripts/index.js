import { allElements } from "./elements.js";
import { Card } from "./Card.js";
// контейнер всех карточек
const elementContainer = document.querySelector(".elements");
// ссылка на попап с картинкой
const openElementPopup = document.querySelector(".popup_function_open-element");
// ссылка на все попапы (массив)
const allPopup = Array.from(document.querySelectorAll(".popup"));
// ссылка на кнопку закрытияч попапа
const buttonClosePopup = openElementPopup.querySelector(
  ".popup__button-close_place_open-element"
);
// функция открытия попапа с картинкой
const openImageElement = () => openElementPopup.classList.add("popup_opened");
// функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};
// функция закрытия попапа при клике по ESC
const closeEscPopup = (popup) => (evt) => {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
};
// слушатель для закрытия попапа по ESC
document.addEventListener("keydown", closeEscPopup(openElementPopup));
// слушатель на кнопку закрытия
buttonClosePopup.addEventListener("click", function () {
  closePopup(openElementPopup);
});
// установка слушателей для закрытия попапов по клику оверлей
allPopup.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup"))
      popup.classList.remove("popup_opened");
  });
});
// перебираем стартовый массив
allElements.forEach((item) => {
  const card = new Card(item.name, item.alt, item.link);
  const cardElement = card.makeCard();
  elementContainer.prepend(cardElement);
});
export { openElementPopup, openImageElement };
