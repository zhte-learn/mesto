export default class Popup {
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