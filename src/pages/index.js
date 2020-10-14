import './index.css';

import {
  buttonEdit,
  formEdit,
  inputValueName,
  inputValueJob,
  buttonAdd,
  formAdd,
  cardsContainer,
  formParameters,
  formAvatar,
  buttonUpdateAvatar,
  profileImage
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let myId = 0;

const cardList = new Section({
  items: [],
  renderer: (item) => {
    creatCard(item);
  }
}, cardsContainer);

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__job',
  avatar: '.profile__image'
})

const creatCard = function (cardData) { 
  const card = new Card(
    cardData,
    handleClickOnCard,
    handleConfirmRemove,
    handleAddLikes,
    handleRemoveLikes,
    '#card',
    myId
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

//обработка submit форм
const formEditSubmitHandler = function(userData) {
  api.updateUserData(userData)
    .then((newUserData) => {
      userInfo.setUserInfo(newUserData);
      popupEdit.close();
    })
    .catch((error) => alert(error))
    .finally(() => {
      popupEdit.renderLoading(false);
    })  
}

const formAddSubmitHandler = function(cardData) {
  api.addNewCard(cardData)
  .then((newCardData) => {
    creatCard(newCardData);
    popupAdd.close();
  })
  .catch((error) => alert(error))
  .finally(() => {
    popupAdd.renderLoading(false);
  })
}

const formAvatarSubmitHandler = function(formData) {
  api.updateAvatar(formData)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupAvatar.close();
  })
  .catch((error) => alert(error))
  .finally(() => {
    popupAvatar.renderLoading(false);
  })
}

const confirmSubmitHandler = function(card) {
  api.deleteCard(card.getCardId())
  .then(() => {
    card.remove();
    popupCofirmRemove.close();
  })
  .catch((error) => alert(error))
}

//добавление и удаление лайков
const handleAddLikes = function(card) {
  api.addLike(card.getCardId())
  .then((cardData) => {
    card.countLikes(cardData.likes);
  })
  .catch((error) => alert(error))
}

const handleRemoveLikes = function(card) {
  api.deleteLike(card.getCardId())
  .then((cardData) => {
    card.countLikes(cardData.likes);
  })
  .catch((error) => alert(error))
}

const addFormValidator = new FormValidator(formParameters, formAdd);
const editFormValidator = new FormValidator(formParameters, formEdit);
const avatarFormValidator = new FormValidator(formParameters, formAvatar);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//обработка открытия и закрытия модальных окон
const popupAdd = new PopupWithForm ('.popup_add', formAddSubmitHandler);
const popupEdit = new PopupWithForm('.popup_edit', formEditSubmitHandler);
const popupWithImage = new PopupWithImage('.popup_pic');
const popupCofirmRemove = new PopupWithSubmit('.popup_confirm', confirmSubmitHandler);
const popupAvatar = new PopupWithForm('.popup_update-avatar', formAvatarSubmitHandler);

buttonAdd.addEventListener('click', () => {
  formAdd.querySelector('.form__button').textContent = 'Создать';
  popupAdd.open();
})

buttonEdit.addEventListener('click', () => {
  popupEdit.open(); 
  const currentUserInfo = userInfo.getUserInfo();
  inputValueName.value = currentUserInfo.name;
  inputValueJob.value = currentUserInfo.about;
})

buttonUpdateAvatar.addEventListener('click', () => {
  popupAvatar.open();
})

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupWithImage.setEventListeners();
popupCofirmRemove.setEventListeners();
popupAvatar.setEventListeners();

//открытие попап zoom
const handleClickOnCard = function (name, link) {  
  popupWithImage.open(name, link); 
}

//открытие попап подтверждения удаления карточки
const handleConfirmRemove = function(card) {
  popupCofirmRemove.open(card);
}

//первоначальная отрисовка сайта
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'b4605774-7fae-4421-b02f-0fbc9c4ca1bb',
    'content-type': 'application/json'
  }
});

const initialCards = api.getAllCards();
const initialUserInfo = api.getUserData();
const promises = [initialCards, initialUserInfo];

Promise.all(promises)
  .then((arrays) => {
    myId = arrays[1]._id;
    userInfo.setUserInfo(arrays[1]);
    arrays[0].forEach((card) => {
      creatCard(card);
    })  
  })  
  .catch((error) => alert(error));