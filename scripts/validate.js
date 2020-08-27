const showInputError = function (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = function(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

const isValid = function (formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const hasInvalidInput = function (inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = function (inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_inactive');
  } else {
    buttonElement.classList.remove('form__button_inactive');
  };
}

const setEventListener = function (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button');

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const clearValidate = function (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button');
  
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
}

const enableValidation = function (params) {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(function(formElement) {
    setEventListener(formElement);
  });
}

enableValidation({
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});