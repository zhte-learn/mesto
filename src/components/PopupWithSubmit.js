import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmitPopup) {
    super(popupSelector);
    this._handleSubmitPopup = handleSubmitPopup;
    this._buttonConfirm = this._popup.querySelector('.popup__button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._buttonConfirm.addEventListener('click', () => {
      this._handleSubmitPopup(this._card);
    })
  }

  open(card) {
    super.open();
    this._card = card;
  }
}