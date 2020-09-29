export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleCloseBound = this._handleClose.bind(this);
    this._escCloseBound = this._handleEscClose.bind(this);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._escCloseBound);
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._escCloseBound);
  }

  _handleEscClose (event) {
    if(event.key === 'Escape') {
      this.close();
    }
  }

  _handleClose (event) {
    const target = event.target;
    if(target.classList.contains('popup__close') || target.classList.contains('popup')) { 
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('click', this._handleCloseBound);
  }
}