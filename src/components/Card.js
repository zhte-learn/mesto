export default class Card {
  constructor(cardData, showPicPopupHandle, 
    showConfirmPopupHandle, likeAddHandler, likeRemoveHandler, templateSelector, myId) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._showPicPopupHandle = showPicPopupHandle;
    this._showConfirmPopupHandle = showConfirmPopupHandle;
    this._likeAddHandler = likeAddHandler;
    this._likeRemoveHandler = likeRemoveHandler;
    this._templateSelector = templateSelector;
    this._myId = myId;
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

  _likeToggle() {
    //почему я не могу в других методах пользоваться this._buttonLike
    this._buttonLike = this._element.querySelector('.button_action_like');
    this._buttonLike.classList.toggle('button_action_like_active');
    
    if(this._buttonLike.classList.contains('button_action_like_active')) {
      this._likeAddHandler(this);
    } else {
      this._likeRemoveHandler(this);
    }
  }

  countLikes(likes) {
    this._element.querySelector('.cards-grid__likes-counter').textContent = likes.length;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.cards-grid__image');
    cardImage.src = this._link;
    cardImage.alt = `Изображение места ${this._name}`;

    if(this._ownerId === this._myId) {
      this._element.querySelector('.button_action_remove').classList.add('button_action_remove_active');
    }

    if(this._likes.some((item) => {
      return item._id === this._myId;
      })) {
        this._element.querySelector('.button_action_like').classList.add('button_action_like_active');
      }

    this._element.querySelector('.cards-grid__caption-title').textContent = this._name;
    this.countLikes(this._likes);
    this._setEventListeners();
    return this._element;
  } 

  _setEventListeners() {
    if(this._ownerId === this._myId) {
      this._element.querySelector('.button_action_remove').addEventListener('click', () => {
        this._showConfirmMessage();
      })
    }
    this._element.querySelector('.button_action_like').addEventListener('click', () => {
      this._likeToggle();  
    })
    this._element.querySelector('.cards-grid__image').addEventListener('click', () => {
      this._showPopupWithPic();
    })
  }
}