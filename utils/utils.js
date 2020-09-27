import PopupWithImage from '../components/PopupWithImage.js';

export const handleCardClick = function (name, link) {
  const popupWithImage = new PopupWithImage('.popup_pic', name, link);
  popupWithImage.open();
}