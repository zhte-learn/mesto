import Card from './Card.js';

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
const popupEdit = document.querySelector('.popup_edit');
const formEdit = popupEdit.querySelector('.form_edit');
const currentPageName = document.querySelector('.profile__name');
const currentPageJob = document.querySelector('.profile__job');
const inputValueName = formEdit.querySelector('.form__input_text_name');
const inputValueJob = formEdit.querySelector('.form__input_text_job');

const buttonAdd = document.querySelector('.button_action_add');
const popupAdd = document.querySelector('.popup_add');
const formAdd = popupAdd.querySelector('.form_add');
const inputValuePlace = formAdd.querySelector('.form__input_text_place');
const inputValueLink = formAdd.querySelector('.form__input_text_link');

const cardsContainer = document.querySelector('.cards-grid__list');

//добавление карточек в DOM
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();
  //console.log('карточки добавились')
  document.querySelector('.cards-grid__list').prepend(cardElement);
})

//открытие и закрытие popups
const handleKeyEsc = function (event) {
  if(event.key === 'Escape') {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  }
}

const handlePopupOverlay = function (event) {
  const target = event.target;
  if(target.classList.contains('popup__close') || target.classList.contains('popup')) {    
    const popup = target.closest('.popup');
    closePopup(popup);
  }
}

const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', handlePopupOverlay);
  window.addEventListener('keydown', handleKeyEsc);
}

const closePopup = function(popup) {
  console.log('ttt')
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', handlePopupOverlay);
  window.removeEventListener('keydown', handleKeyEsc);
}

const openPopupEdit = function(event) {
  if(!popupEdit.classList.contains('popup_opened')) {
    inputValueName.value = currentPageName.textContent;
    inputValueJob.value = currentPageJob.textContent;
  }
  openPopup(popupEdit);
  //clearValidate(popupEdit, formParameters);
}

const openPopupAdd = function(event) {
  if(!popupAdd.classList.contains('popup_opened')) {  
    inputValuePlace.value = '';
    inputValueLink.value = '';
  }
  openPopup(popupAdd);
  //clearValidate(popupAdd, formParameters);
}

buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupAdd);