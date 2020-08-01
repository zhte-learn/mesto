let buttonEdit = document.querySelector('.button_action_edit');
let popup = document.querySelector('.popup');
let popupButtonClose = popup.querySelector('.popup__close');
let formEdit = popup.querySelector('.form-edit');

let currentPageName = document.querySelector('.profile__name');
let currentPageJob = document.querySelector('.profile__job');
let inputName = formEdit.querySelector('.form-edit__input_text_name');
let inputJob = formEdit.querySelector('.form-edit__input_text_job');

function popupToggle(event) {
  if(!popup.classList.contains('popup_opened')) {
    inputName.value = currentPageName.textContent;
    inputJob.value = currentPageJob.textContent;
  } else if(event.target !== event.currentTarget && event.target !== popupButtonClose) return;

  popup.classList.toggle('popup_opened');  
}

function formSubmitHandler(event) {
  event.preventDefault(); 
  
  currentPageName.textContent = inputName.value;
  currentPageJob.textContent = inputJob.value;

  popupToggle(event);
}

formEdit.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', popupToggle);
popup.addEventListener('click', popupToggle);

window.addEventListener('keydown', function (event){
  if (event.keyCode === 27 && popup.classList.contains('popup_opened')){
    event.preventDefault();    
    popup.classList.remove('popup_opened');
  }
});