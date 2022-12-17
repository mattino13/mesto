const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item', 
  submitButtonSelector: '.popup__button-save', 
  inactiveButtonClass: 'popup__button-save_disabled', 
  inputErrorClass: 'popup__item_invalid',  
  errorClass: 'popup__item-error'
};

function findSpanElementByInputId(form, inputId) {
  return form.querySelector(`#${inputId}-error`);
}

function hideInputError(form, input, config) {
  const spanError = findSpanElementByInputId(form, input.id);
  
  spanError.classList.remove(config.errorClass);
  spanError.textContent = '';
  input.classList.remove(config.inputErrorClass);
}

function showInputError(form, input, config) {
  const spanError = findSpanElementByInputId(form, input.id);

  spanError.classList.add(config.errorClass);
  spanError.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
}

// Валидируем инпут
function validateInput(form, input, config) {
  if (input.validity.valid) {
    hideInputError(form, input, config);
  } else {
    showInputError(form, input, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

function enableButtonState(button, config) {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = '';
};

function disableButtonState(button, config) {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = 'disabled';
}

// Обработка состояния кнопки submit
function toggleButtonState (inputList, button, config) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    disableButtonState(button, config);
  } else {
    enableButtonState(button, config);
  }
}; 

function setupFormListeners(formElement, config) {
  // Находим все поля внутри формы
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  // Найдём в форме кнопку submit
  const button = formElement.querySelector(config.submitButtonSelector);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((input) => {
    // каждому полю добавим обработчик события input
    input.addEventListener('input', () => {
      validateInput(formElement, input, config); 
      toggleButtonState(inputList, button, config);
    });
  });
}; 

function enableValidation(config) {
  //Массив всех форм
  const forms = [... document.querySelectorAll(config.formSelector)];

  forms.forEach((form) => setupFormListeners(form, config));
}
