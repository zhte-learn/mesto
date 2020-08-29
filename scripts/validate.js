//функция вывода сообщения об ошибке
const showInputError = function (formElement, inputElement, errorMessage, params) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
};

//функция сокрытия сообщения об ошибке
const hideInputError = function(formElement, inputElement, params) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
}

//функции проверки формы на валидность
const isValid = function (formElement, inputElement, params) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
}

const hasInvalidInput = function (inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

//функция изменения состояния кнопки
const toggleButtonState = function (inputList, buttonElement, params) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
}

//установка слушателей
const setEventListener = function (formElement, params) {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.buttonSelector);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, params);
      toggleButtonState(inputList, buttonElement, params);
    });
  });
}

const formParameters = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

//функция сброса результатов проверки на валидность
const clearValidate = function (formElement, params) {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.buttonSelector);
  
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, params);
    toggleButtonState(inputList, buttonElement, params);
  });
}

const enableValidation = function (params) {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach(function(formElement) {
    setEventListener(formElement, params);
  });
}

enableValidation(formParameters);