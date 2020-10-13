import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, loadingHandler) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._form.querySelector('.form__button').textContent = 'Сохранение...';
    } else {
      this._form.querySelector('.form__button').textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this.renderLoading(true);

      this._handleSubmitForm(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}