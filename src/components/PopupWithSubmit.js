import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmitPopup) {
    super(popupSelector);
    this._handleSubmitPopup = handleSubmitPopup;
    this._button = this._popup.querySelector('.popup__button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._button.addEventListener('click', (evt) => {
      this._handleSubmitPopup(this._card);
    })
  }

  open(card) {
    super.open();
    this._card = card;
  }
}