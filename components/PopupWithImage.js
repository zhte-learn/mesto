import Popup from './Popup.js';

import {popupImage, popupTitle} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    super.open();
    popupImage.src = this._link;
    popupImage.alt = 'Изображение места ' + this._name;
    popupTitle.textContent = this._name; 
  }
}