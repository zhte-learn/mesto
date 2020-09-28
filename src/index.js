import './index.css';

import {
  initialCards,
  buttonEdit,
  formEdit,
  inputValueName,
  inputValueJob,
  buttonAdd,
  formAdd,
  cardsContainer,
  formParameters
} from './utils/constants.js';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';

const creatCard = function (cardData) {
  const card = new Card(cardData.place, cardData.link, handleCardClick, '#card');  
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

//обработка форм
const formEditSubmitHandler = function(userData) {
  userInfo.setUserInfo(userData);
  popupEdit.close();
}

const formAddSubmitHandler = function(cardData) {
  creatCard(cardData);
  popupAdd.close();
}

const addFormValidator = new FormValidator(formParameters, formAdd);
const editFormValidator = new FormValidator(formParameters, formEdit);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

//обработка открытия и закрытия модальных окон
const popupAdd = new PopupWithForm ('.popup_add', formAddSubmitHandler);
const popupEdit = new PopupWithForm('.popup_edit', formEditSubmitHandler);

buttonAdd.addEventListener('click', () => {
  popupAdd.open(); 
})

buttonEdit.addEventListener('click', () => {
  popupEdit.open(); 
  const currentUserInfo = userInfo.getUserInfo();
  inputValueName.value = currentUserInfo.name;
  inputValueJob.value = currentUserInfo.job;
})

popupAdd.setEventListeners();
popupEdit.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_pic');

const handleCardClick = function (name, link) {  
  popupWithImage.open(name, link);
  popupWithImage.setEventListeners();
}

//добавление карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    creatCard(item);
  }
}, cardsContainer)

cardList.renderItems();

//данные о пользователе
const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job'
})