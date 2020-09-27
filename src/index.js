import './index.css';

import {
  initialCards,
  buttonEdit,
  formEdit,
  inputValueName,
  inputValueJob,
  buttonAdd,
  formAdd,
  inputValuePlace,
  inputValueLink,
  cardsContainer,
  formParameters
} from './utils/constants.js';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

import {handleCardClick} from './utils/utils.js';

//добавление карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, handleCardClick, '#card');  
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardsContainer)

cardList.renderItems();

//данные о пользователе
const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job'
})

//обработка форм
const formEditSubmitHandler = function(event) {
  event.preventDefault();

  userInfo.setUserInfo(popupEdit.close());
}

const formAddSubmitHandler = function(event) {
  event.preventDefault();

  const card = new Card(inputValuePlace.value, inputValueLink.value, handleCardClick, '#card');
  const cardElement = card.generateCard();
 
  cardList.addItem(cardElement);
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