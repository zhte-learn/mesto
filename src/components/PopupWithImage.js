import Popup from './Popup.js';

//неправильно импортировать! Надо искать в конструкторе по селектору
import {popupImage, popupTitle} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    //искать заголовок и картинку здесь!
    popupImage.src = link;
    popupImage.alt = 'Изображение места ' + name;
    popupTitle.textContent = name;
  }
}