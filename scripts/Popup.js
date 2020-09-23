export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._overlayClose = this._handleOverlayClose.bind(this);
    this._escClose = this._handleEscClose.bind(this);
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
    document.addEventListener('click', this._overlayClose);
    window.addEventListener('keydown', this._escClose);
  }

  removeEventListeners() {
    document.removeEventListener('click', this._overlayClose);
    window.removeEventListener('keydown', this._escClose);
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
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    //this._inputList.forEach(input => this._formValues[input.name] = input.value);
    this._inputList.forEach(input => this._formValues[input.id] = input.value);
    //console.log(this._formValues)
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitForm);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._handleSubmitForm);
  }

  close () {
    super.close();
    this._form.reset();
  }
}