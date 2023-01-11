export class FormValidator {
  constructor(formConfig, formElement) {
    this._formConfig = formConfig;
    this._formElement = formElement;

    // Находим все поля внутри формы
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector));
  }

    // Валидируем инпут
  _validateInput(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _findSpanElementByInputId(inputId) {
    return this._formElement.querySelector(`#${inputId}-error`);
  }

  _hideInputError(input) {
    const spanError = this._findSpanElementByInputId(input.id);
    
    spanError.classList.remove(this._formConfig.errorClass);
    spanError.textContent = '';
    input.classList.remove(this._formConfig.inputErrorClass);
  }

  _showInputError(input) {
    const spanError = this._findSpanElementByInputId(input.id);
  
    spanError.classList.add(this._formConfig.errorClass);
    spanError.textContent = input.validationMessage;
    input.classList.add(this._formConfig.inputErrorClass);
  }
  
  // Обработка состояния кнопки submit
  _toggleButtonState (button) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      this._disableButtonState(button);
    } else {
      this._enableButtonState(button);
    }
  }; 

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  _disableButtonState(button) {
    button.classList.add(this._formConfig.inactiveButtonClass);
    button.disabled = true;
  }

  _enableButtonState(button) {
    button.classList.remove(this._formConfig.inactiveButtonClass);
    button.disabled = false;
  };

  enableValidation() {
    // Найдём в форме кнопку submit
    const button = this._formElement.querySelector(this._formConfig.submitButtonSelector);

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((input) => {
      // каждому полю добавим обработчик события input
      input.addEventListener('input', () => {
        this._validateInput(input); 
        this._toggleButtonState(button);
      });
    });
  }
}


