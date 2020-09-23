export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();  
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  _handleEscClose (event) {
    if(event.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose (event) {
    const target = event.target;
    if(target.classList.contains('popup__close') || target.classList.contains('popup')) { 
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('click', (event) => {
      this._handleOverlayClose(event);
    });
    window.addEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });
  }

  removeEventListeners() {
    document.removeEventListener('click', (event) => {
      this._handleOverlayClose(event);
    });
    window.removeEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });
  }
}

const popupImage = document.querySelector('.figure-pic__image');
const popupTitle = document.querySelector('.figure-pic__figcaption');

export class PopupWithImage extends Popup {
  constructor (popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    super.open();
    popupImage.src = this._link;
    popupImage.alt = 'Изображение места ' + this._name;
    popupTitle.textContent = this._name; 
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormFunc) {
    super(popupSelector);
    this._submitForm = submitFormFunc;
  }

  _getInputValues() {
    
  }
}