const popupPic = document.querySelector('.popup_pic');
const popupImage = popupPic.querySelector('.figure-pic__image');
const popupTitle = popupPic.querySelector('.figure-pic__figcaption');

//добавляю эти функции, чтобы была возможность удалить слушатель при закрытии попап.
const handleKeyEsc = function (event) {
  if(event.key === 'Escape') {
    popupPic.classList.remove('popup_opened');
  }
}

const handlePopupOverlay = function (event) {
  const target = event.target;
  if(target.classList.contains('popup__close') || target.classList.contains('popup')) {    
    popupPic.classList.remove('popup_opened');
  }
}

export default class Card {
  constructor(name, link) {
    this._link = link;
    this._name = name;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }

  _handleOpenPopup() {
    popupImage.src = this._link;
    popupImage.alt = 'Изображение места';
    popupTitle.textContent = this._name;

    popupPic.classList.add('popup_opened');

    document.addEventListener('click', handlePopupOverlay);
    window.addEventListener('keydown', handleKeyEsc);  
  }

  _handleClosePopup() {
    popupImage.src = '';
    popupImage.alt = '';
    popupTitle.textContent = '';

    document.removeEventListener('click', handlePopupOverlay);
    window.removeEventListener('keydown', handleKeyEsc);
  }

  _setEventListeners() {
    this._element.querySelector('.cards-grid__image').addEventListener('click', () => {
      this._handleOpenPopup();
    })
  }

  _remove() {
    this._element.querySelector('.button_action_remove').addEventListener('click', function (event) {
      const itemToRemove = event.target.closest('.cards-grid__item');
      itemToRemove.remove();
    })
  }

  _like() {
    this._element.querySelector('.button_action_like').addEventListener('click', function (event) {
      const likeButtonClicked = event.target;
      likeButtonClicked.classList.toggle('button_action_like_active');
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._remove();
    this._like();

    this._element.querySelector('.cards-grid__image').src = this._link;
    this._element.querySelector('.cards-grid__caption-title').alt = 'Изображение места';
    this._element.querySelector('.cards-grid__caption-title').textContent = this._name;

    return this._element;
  }

}