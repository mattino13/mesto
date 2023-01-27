import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputArray = Array.from(this._form.querySelectorAll('.popup__item'));
  }

  _getInputValues() {
    const result = {};
    this._inputArray.forEach( (input) => {
      result[input.name] = input.value;
    });
    
    return result;
  }

  _handleFormSubmit (evt) {
    evt.preventDefault();
    this._formSubmitCallback(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit.bind(this));
  }

  close() {
    super.close();
    this._form.reset();
  }

}