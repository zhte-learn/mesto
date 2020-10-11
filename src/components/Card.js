export default class Card {
  constructor(name, link, likes, id, showPicPopupHandle, showConfirmPopupHandle, templateSelector, isOwner) {
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._id = id;
    this._showPicPopupHandle = showPicPopupHandle;
    this._showConfirmPopupHandle = showConfirmPopupHandle;
    this._templateSelector = templateSelector;
    this._isOwner = isOwner;
  }

  getCardId() {
    return this._id;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.children[0];
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }

  _showPopupWithPic() {
    this._showPicPopupHandle(this._name, this._link);
  }

  _showConfirmMessage() {
    this._showConfirmPopupHandle(this);
  }

  remove() { 
    this._element.remove();
    this._element = null;
  }

  _like() {
    this._element.querySelector('.button_action_like').classList.toggle('button_action_like_active');  
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.cards-grid__image');
    cardImage.src = this._link;
    cardImage.alt = `Изображение места ${this._name}`;

    if(this._isOwner) {
      this._element.querySelector('.button_action_remove').classList.add('button_action_remove_active');
    }

    this._element.querySelector('.cards-grid__caption-title').textContent = this._name;
    this._element.querySelector('.cards-grid__likes-counter').textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  } 

  _setEventListeners() {
    if(this._isOwner) {
      this._element.querySelector('.button_action_remove').addEventListener('click', () => {
        this._showConfirmMessage();
      })
    }
    this._element.querySelector('.button_action_like').addEventListener('click', () => {
      this._like();  
    })
    this._element.querySelector('.cards-grid__image').addEventListener('click', () => {
      this._showPopupWithPic();
    })
  }
}