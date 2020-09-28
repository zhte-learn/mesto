import Popup from './Popup.js';

import {popupImage, popupTitle} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    
    popupImage.src = link;
    popupImage.alt = 'Изображение места ' + name;
    popupTitle.textContent = name;
  }
}