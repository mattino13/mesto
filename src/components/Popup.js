export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector('.popup__button-close');
    // без такой хитрости не смогла снять слушатель событий
    this._bindedHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', this._bindedHandleEscClose);
  }
  
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._bindedHandleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      if (this._popupElement.classList.contains('popup_opened')) {
        this.close();
      }
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this.close.bind(this));

    this._popupElement.addEventListener('click', (evt) => {                           
      if (!evt.target.closest('.popup__overlay')) {
        this.close();
      }
    });
  }
}
