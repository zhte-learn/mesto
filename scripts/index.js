import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import {Popup, PopupWithForm, PopupWithImage} from './Popup.js';
import UserInfo from './UserInfo.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const buttonEdit = document.querySelector('.button_action_edit');
//const popupEdit = document.querySelector('.popup_edit');
const formEdit = document.querySelector('.form_edit');
const currentPageName = document.querySelector('.profile__name');
const currentPageJob = document.querySelector('.profile__job');
const inputValueName = formEdit.querySelector('.form__input_text_name');
const inputValueJob = formEdit.querySelector('.form__input_text_job');

const buttonAdd = document.querySelector('.button_action_add');
//const popupAdd = document.querySelector('.popup_add');
const formAdd = document.querySelector('.form_add');
const inputValuePlace = formAdd.querySelector('.form__input_text_place');
const inputValueLink = formAdd.querySelector('.form__input_text_link');

//const popupPic = document.querySelector('.popup_pic');

const cardsContainer = document.querySelector('.cards-grid__list');

//открытие и закрытие popups

/* const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', handlePopupOverlay);
  window.addEventListener('keydown', handleKeyEsc);
}

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', handlePopupOverlay);
  window.removeEventListener('keydown', handleKeyEsc);
} */

/* const openPopupEdit = function() {
  if(!popupEdit.classList.contains('popup_opened')) {
    formEdit.reset();
    inputValueName.value = currentPageName.textContent;
    inputValueJob.value = currentPageJob.textContent;
  }
  openPopup(popupEdit);
}

const openPopupAdd = function(event) {
  if(!popupAdd.classList.contains('popup_opened')) { 
    formAdd.reset();
  }
  openPopup(popupAdd);
} */

/* const openPopupPic = function (name, link) {
  popupImage.src = link;
  popupImage.alt = 'Изображение места ' + name;
  popupTitle.textContent = name;    
  openPopup(popupPic);
} */



const handleCardClick = function (name, link) {
  const popupWithImage = new PopupWithImage('.popup_pic', name, link);
  popupWithImage.open();
}

//добавление карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, handleCardClick, '#card');  
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardsContainer);

cardList.renderItems();

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

const formParameters = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const addFormValidator = new FormValidator(formParameters, formAdd);
const editFormValidator = new FormValidator(formParameters, formEdit);
addFormValidator.enableValidation();
editFormValidator.enableValidation();


const popupAdd = new PopupWithForm ('.popup_add', formAddSubmitHandler);
const popupEdit = new PopupWithForm('.popup_edit', formEditSubmitHandler);

buttonAdd.addEventListener('click', () => {
  popupAdd.open();
});

buttonEdit.addEventListener('click', () => {
  popupEdit.open();
  const currentUserInfo = userInfo.getUserInfo();
  inputValueName.value = currentUserInfo.name;
  inputValueJob.value = currentUserInfo.job;
})

const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job'
});

