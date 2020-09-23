export default class Card {
  constructor(name, link, openPopupPicCallBack, templateSelector) {
    this._link = link;
    this._name = name;
    this._openPopupPicCallBack = openPopupPicCallBack;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.children[0];
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }

  _showPic() {
    this._openPopupPicCallBack(this._name, this._link);
  }

  _remove() { 
    this._element.remove(); 
  }

  _like() {
    this._element.querySelector('.button_action_like').classList.toggle('button_action_like_active');  
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.cards-grid__image');
    cardImage.src = this._link;
    cardImage.alt = `Изображение места ${this._name}`;
    this._element.querySelector('.cards-grid__caption-title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  } 

  _setEventListeners() {
    this._element.querySelector('.button_action_remove').addEventListener('click', () => {
      this._remove();
    })
    this._element.querySelector('.button_action_like').addEventListener('click', () => {
      this._like();  
    })
    this._element.querySelector('.cards-grid__image').addEventListener('click', () => {
      this._showPic();
    })
  }
}