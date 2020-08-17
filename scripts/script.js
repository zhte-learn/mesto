//открытие попапа Edit
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
const popupPicImage = popupPic.querySelector('.figure-pic__image');
const popupPicCaption = popupPic.querySelector('.figure-pic__figcaption');

const cardsContainer = document.querySelector('.cards-grid__list');

//открытие и закрытие popups
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
}

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
}

const openPopupEdit = function(event) {
  if(!popupEdit.classList.contains('popup_opened')) {
    inputValueName.value = currentPageName.textContent;
    inputValueJob.value = currentPageJob.textContent;
  }
  openPopup(popupEdit);
}

const openPopupAdd = function(event) {
  if(!popupAdd.classList.contains('popup_opened')) {  
    inputValuePlace.value = '';
    inputValueLink.value = '';
  }
  openPopup(popupAdd);
}

buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupAdd);

document.addEventListener('click', function(event) {
  const target = event.target;

  if(target.classList.contains('popup__close') || target.classList.contains('popup')) {    
    const popup = target.closest('.popup');
    closePopup(popup);
  }
})

//обработка форм редактирования и добавления карточек
const formEditSubmitHandler = function(event) {
  event.preventDefault(); 
  
  currentPageName.textContent = inputValueName.value;
  currentPageJob.textContent = inputValueJob.value;

  closePopup(popupEdit);
}

formEdit.addEventListener('submit', formEditSubmitHandler);

const formAddSubmitHandler = function(event) {
  event.preventDefault();

  const newItem = {name: inputValuePlace.value, link: inputValueLink.value};

  addCardToPage(newItem);
  closePopup(popupAdd);
}

formAdd.addEventListener('submit', formAddSubmitHandler);

//создание новой template card
const createCard = function(item) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.cards-grid__image');
  const cardTitle = cardElement.querySelector('.cards-grid__caption-title');

  cardImage.src = item.link;
  cardImage.alt = 'Изображение места';
  cardTitle.textContent = item.name;

  cardElement.querySelector('.button_action_like').addEventListener('click', function (event) {
    const likeButtonClicked = event.target;
    likeButtonClicked.classList.toggle('button_action_like_active');
  });
  
  cardElement.querySelector('.button_action_remove').addEventListener('click', function (event) {
    const itemToRemove = event.target.closest('.cards-grid__item');
    itemToRemove.remove();
  });
  
  cardElement.querySelector('.cards-grid__image').addEventListener('click', function(event) {
    popupPicImage.src = item.link;
    popupPicImage.alt = 'Изображение места';
    popupPicCaption.textContent = item.name;    
    openPopup(popupPic);
  });

  return cardElement;
}

//добавление карточки в html
const addCardToPage = function(item) {
  cardsContainer.prepend(createCard(item));
}

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

initialCards.forEach(addCardToPage);