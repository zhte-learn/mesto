//открытие попапа Edit
const buttonEdit = document.querySelector('.button_action_edit');
const popupEdit = document.querySelector('.popup_edit');
const formEdit = popupEdit.querySelector('.form_edit');
const currentPageName = document.querySelector('.profile__name');
const currentPageJob = document.querySelector('.profile__job');

const openPopupEdit = function(event) {
  if(!popupEdit.classList.contains('popup_opened')) {
    formEdit.querySelector('.form__input_text_name').value = currentPageName.textContent;
    formEdit.querySelector('.form__input_text_job').value = currentPageJob.textContent;
  }

  popupEdit.classList.add('popup_opened');
}

buttonEdit.addEventListener('click', openPopupEdit);

//открытие попапа Add
const buttonAdd = document.querySelector('.button_action_add');
const popupAdd = document.querySelector('.popup_add');
const formAdd = popupAdd.querySelector('.form_add');

const openPopupAdd = function(event) {
  if(!popupAdd.classList.contains('popup_opened')) {
    const placeInput = formAdd.querySelector('.form__input_text_place');
    const linkInput = formAdd.querySelector('.form__input_text_link');
    placeInput.value = '';
    linkInput.value = '';
  }

  popupAdd.classList.add('popup_opened');
}

buttonAdd.addEventListener('click', openPopupAdd);

//открытие попапа картинки
const popupPic = document.querySelector('.popup_pic');

function openPopupPic(event) {
  popupPic.classList.add('popup_opened');  
}

popupPic.addEventListener('click', openPopupPic);

//закрытие всех попапов
document.addEventListener('click', function(event) {
  const target = event.target;

  if(target.classList.contains('popup__close') || target.classList.contains('popup')) {    
    const popup = target.closest('.popup');
    popup.classList.remove('popup_opened');
  }
})

//закрытие всех попапов нажатием на Esc
const popups = document.querySelectorAll('.popup');

window.addEventListener('keydown', function (event){
  for(let i = 0; i < popups.length; i++) {
    if (event.keyCode === 27 && popups[i].classList.contains('popup_opened')){
      event.preventDefault();    
      popups[i].classList.remove('popup_opened');
    }
  } 
});

//редактирование сведений об авторе
const formEditSubmitHandler = function(event) {
  event.preventDefault(); 
  
  currentPageName.textContent = formEdit.querySelector('.form__input_text_name').value;
  currentPageJob.textContent = formEdit.querySelector('.form__input_text_job').value;

  popupEdit.classList.remove('popup_opened'); 
}

formEdit.addEventListener('submit', formEditSubmitHandler);

//добавление карточек
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

const addCardTemplateToContainer = function(item) {
  const cardTemplate = document.querySelector('#card').content;
  const cardsContainer = document.querySelector('.cards-grid__list'); 
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards-grid__image').src = item.link;
  cardElement.querySelector('.cards-grid__caption-title').textContent = item.name;

  cardElement.querySelector('.button_action_like').addEventListener('click', function (evt) {
    const likeButtonClicked = evt.target;
    likeButtonClicked.classList.toggle('button_action_like_active');
  });
  
  cardElement.querySelector('.button_action_remove').addEventListener('click', function (evt) {
    const listItemToRemove = evt.target.closest('.cards-grid__item');
    listItemToRemove.remove();
  });
  
  cardElement.querySelector('.cards-grid__image').addEventListener('click', function(evt) {
    popupPic.querySelector('.figure-pic__image').src = item.link;
    popupPic.querySelector('.figure-pic__figcaption').textContent = item.name;    
    openPopupPic(event);
  });

  cardsContainer.prepend(cardElement);
}

initialCards.forEach(addCardTemplateToContainer);

const formAddSubmitHandler = function(event) {
  event.preventDefault();
  
  const placeInput = formAdd.querySelector('.form__input_text_place').value;
  const linkInput = formAdd.querySelector('.form__input_text_link').value;

  const newItem = {name: placeInput, link: linkInput};

  console.log(linkInput)

  if(placeInput.length > 0 && linkInput.length > 0) {
    addCardTemplateToContainer(newItem);
  }

  popupAdd.classList.remove('popup_opened'); 
}

formAdd.addEventListener('submit', formAddSubmitHandler);