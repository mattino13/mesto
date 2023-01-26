export class FormValidator {
  constructor(formConfig, formElement) {
    this._formConfig = formConfig;
    this._formElement = formElement;

    // Находим все поля внутри формы
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector));
  }

    // Валидируем инпут
  validateInput(input) {
    if (input.validity.valid) {
      this.hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _findSpanElementByInputId(inputId) {
    return this._formElement.querySelector(`#${inputId}-error`);
  }

  hideInputError(input) {
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
  toggleButtonState () {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      this._disableButtonState();
    } else {
      this._enableButtonState();
    }
  }; 

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  _disableButtonState() {
    this._button.classList.add(this._formConfig.inactiveButtonClass);
    this._button.disabled = true;
  }

  _enableButtonState() {
    this._button.classList.remove(this._formConfig.inactiveButtonClass);
    this._button.disabled = false;
  };

  enableValidation() {
    // Найдём в форме кнопку submit
    this._button = this._formElement.querySelector(this._formConfig.submitButtonSelector);

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((input) => {
      // каждому полю добавим обработчик события input
      input.addEventListener('input', () => {
        this.validateInput(input); 
        this.toggleButtonState();
      });
    });
  }
}