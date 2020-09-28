export default class FormValidator {
  constructor(formParams, formElement) {
    this._formParams = formParams;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formParams.inputSelector));  
    this._buttonElement = this._formElement.querySelector(this._formParams.buttonSelector);
  }

  _showInputError(inputElement) {  
    inputElement.classList.add(this._formParams.inputErrorClass);
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._formParams.errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._formParams.inputErrorClass);
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._formParams.errorClass);
  }

  _isValid(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if(this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._formParams.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._formParams.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() { 
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    })

    this._formElement.addEventListener('reset', () => {
      this._clearValidate();
    })
  }

  _clearValidate() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
    this._buttonElement.classList.add(this._formParams.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', '');
  }

  enableValidation() { 
    this._setEventListeners();
  }
}