import './index.css';

import {
  buttonEdit,
  formEdit,
  inputValueName,
  inputValueJob,
  buttonAdd,
  formAdd,
  cardsContainer,
  formParameters
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
  about: '.profile__job'
})

const creatCard = function (cardData) {
  const isOwner = cardData.owner._id === myId;
  const card = new Card(cardData.name, cardData.link, cardData.likes, cardData._id, handleClickOnCard, handleConfirmRemove, '#card', isOwner); 
  //console.log(card)
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

//обработка форм
const formEditSubmitHandler = function(userData) {  
  const updateUserData = apiUserInfo.patchData(userData);
  updateUserData.then((newUserData) => {
    userInfo.setUserInfo(newUserData);
  })
  popupEdit.close();
}

const formAddSubmitHandler = function(cardData) {
  const apiAddNewCard = apiCards.addNewCard(cardData);
  apiAddNewCard.then((newCardData) => {
    //console.log(newCardData)
    creatCard(newCardData);
  })
  popupAdd.close();
}

const confirmSubmitHandler = function(card) {
  const deleteCard = apiCards.delete(card.getCardId());
  deleteCard.then(() => {
    card.remove();
  })
  .catch((error) => alert(error))
  .finally(() => {
    popupCofirmRemove.close();
  })
}

const addFormValidator = new FormValidator(formParameters, formAdd);
const editFormValidator = new FormValidator(formParameters, formEdit);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

//обработка открытия и закрытия модальных окон
const popupAdd = new PopupWithForm ('.popup_add', formAddSubmitHandler);
const popupEdit = new PopupWithForm('.popup_edit', formEditSubmitHandler);
const popupWithImage = new PopupWithImage('.popup_pic');
const popupCofirmRemove = new PopupWithSubmit('.popup_confirm', confirmSubmitHandler);

buttonAdd.addEventListener('click', () => {
  popupAdd.open(); 
})

buttonEdit.addEventListener('click', () => {
  popupEdit.open(); 
  const currentUserInfo = userInfo.getUserInfo();
  inputValueName.value = currentUserInfo.name;
  inputValueJob.value = currentUserInfo.about;
})

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupWithImage.setEventListeners();
popupCofirmRemove.setEventListeners();

const handleClickOnCard = function (name, link) {  
  popupWithImage.open(name, link); 

}

const handleConfirmRemove = function(card) {
  popupCofirmRemove.open(card);

}

//первоначальная отрисовка сайта
const apiCards = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/cards',
  headers: {
    authorization: 'b4605774-7fae-4421-b02f-0fbc9c4ca1bb',
    'content-type': 'application/json'
  },
});


const initialCards = apiCards.getAllCards();
/*
initialCards.then((cards) => {
  //console.log(cards);
})
*/
//данные о пользователе


const apiUserInfo = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/users/me',
  headers: {
    authorization: 'b4605774-7fae-4421-b02f-0fbc9c4ca1bb',
    'content-type': 'application/json'
  },
});

const initialUserInfo = apiUserInfo.getData();

const promises = [initialCards, initialUserInfo];

Promise.all(promises)
  .then((arrays) => {
    myId = arrays[1]._id;
    userInfo.setUserInfo(arrays[1])
    document.querySelector('.profile__image').src = arrays[1].avatar; 
    document.querySelector('.profile__image').alt = `Изображение ${arrays[1].name}`;
    
    arrays[0].forEach((card) => {
      creatCard(card);
    });
  })
  .catch((error) => alert(error));