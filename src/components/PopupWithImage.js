import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePreview = this._popupElement.querySelector('.popup__image');
    this._subtitlePreview = this._popupElement.querySelector('.popup__subtitle');
  }

  open(name, link) {
    //инициализация элементов попапа Изображения
    this._imagePreview.src = link;
    this._imagePreview.alt = name;
    this._subtitlePreview.textContent = name;

    super.open();
  }
}
