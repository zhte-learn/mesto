export const initialCards = [
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

export const popupImage = document.querySelector('.figure-pic__image');
export const popupTitle = document.querySelector('.figure-pic__figcaption');

export const buttonEdit = document.querySelector('.button_action_edit');
export const formEdit = document.querySelector('.form_edit');
export const inputValueName = formEdit.querySelector('.form__input_text_name');
export const inputValueJob = formEdit.querySelector('.form__input_text_job');

export const buttonAdd = document.querySelector('.button_action_add');
export const formAdd = document.querySelector('.form_add');
export const inputValuePlace = formAdd.querySelector('.form__input_text_place');
export const inputValueLink = formAdd.querySelector('.form__input_text_link');

export const cardsContainer = document.querySelector('.cards-grid__list');

export const formParameters = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}