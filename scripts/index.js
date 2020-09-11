import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const popupPic = document.querySelector('.popup_pic');
const popupImage = popupPic.querySelector('.figure-pic__image');
const popupTitle = popupPic.querySelector('.figure-pic__figcaption');

const cardsContainer = document.querySelector('.cards-grid__list');

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
  editFormValidator.enableValidation();
}

const openPopupAdd = function(event) {
  if(!popupAdd.classList.contains('popup_opened')) {  
    inputValuePlace.value = '';
    inputValueLink.value = '';
  }
  openPopup(popupAdd);
  addFormValidator.enableValidation();
}

const openPopupPic = function (name, link) {
  popupImage.src = link;
  popupImage.alt = 'Изображение места';
  popupTitle.textContent = name;    
  openPopup(popupPic);
}

buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupAdd);

//обработка формы редактирования
const formEditSubmitHandler = function(event) {
  event.preventDefault(); 
  
  currentPageName.textContent = inputValueName.value;
  currentPageJob.textContent = inputValueJob.value;

  closePopup(popupEdit);
}

//добавление карточек
const addCardToPage = function(card) {
  cardsContainer.prepend(card);
}

const formAddSubmitHandler = function(event) {
  event.preventDefault();

  const card = new Card(inputValuePlace.value, inputValueLink.value, openPopupPic, '#card');
  const cardElement = card.generateCard();

  addCardToPage(cardElement);
  closePopup(popupAdd);
}

formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);


//добавление массива карточек в DOM
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, openPopupPic, '#card');  
  const cardElement = card.generateCard();
  addCardToPage(cardElement);
})

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