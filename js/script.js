let buttonEdit = document.querySelector('.btn_action_edit');
let popup = document.querySelector('.popup');
let popupButtonClose = popup.querySelector('.popup__close');
let formEdit = popup.querySelector('.form-edit');

let currentPageName = document.querySelector('.profile__name');
  let currentPageJob = document.querySelector('.profile__job');
  let inputName = formEdit.querySelector('.form-edit__text_name');
  let inputJob = formEdit.querySelector('.form-edit__text_job');

function popupToggle(event) {
  popup.classList.toggle('popup_opened');
  inputName.value = currentPageName.textContent;
  inputJob.value = currentPageJob.textContent;
}

function popupClose(event) {
  if(event.target !== event.currentTarget && event.target !== popupButtonClose) {
    return;
  } 
  popupToggle(event);
}

function formSubmitHandler(event) {
  event.preventDefault(); 
  
  currentPageName.textContent = inputName.value;
  currentPageJob.textContent = inputJob.value;

  popupToggle(event);
}

formEdit.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', popupToggle);
popup.addEventListener('click', popupClose);

window.addEventListener('keydown', function (event){
  if (event.keyCode === 27){
      event.preventDefault();
      if (popup.classList.contains('popup_opened')){
        popup.classList.remove('popup_opened');
    }
  }
});