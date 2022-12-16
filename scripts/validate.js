const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item', 
  submitButtonSelector: '.popup__button-save', 
  inactiveButtonClass: 'popup__button-save_disabled', 
  inputErrorClass: 'popup__item_invalid',  
  errorClass: 'popup__item-error',
  popupOverlayClass: '.popup__overlay'
};

// Установка состояния кнопок на ошибки валидации
function validateButton(input, config) {
  //находим по input соответствующую ему форму и кнопку
  const form = input.closest(config.formSelector);
  const button = form.querySelector(config.submitButtonSelector);

  const isFormValid = [... form.elements].every(input2 => input2.validity.valid);

  if (isFormValid) {
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.classList.add(config.inactiveButtonClass); 
  }
}

// Валидируем инпут
function validateInput(input, config, hideValidationError = 0) {
  const spanError = document.querySelector(`#${input.id}-error`);
  
    if (input.validity.valid || hideValidationError) {
      spanError.classList.remove(config.errorClass);
      spanError.textContent = '';
      input.classList.remove(config.inputErrorClass);
    } else {
      spanError.classList.add(config.errorClass);
      spanError.textContent = input.validationMessage;
      input.classList.add(config.inputErrorClass);
    }
}

// Поиск открытого попапа
function findOpenedPopup() {
  return document.querySelector('.popup_opened');
}

function enableValidation(config) {
  // Массив всех инпутов
  const inputs = [... document.querySelectorAll(config.inputSelector)];

  // Обработчики валидации инпутов
  inputs.forEach(input => {
    input.addEventListener('input', () => { 
      validateInput(input, config); 
      validateButton(input, config);
    });
  } );

  // Обработчики закрытия попапа нажатием на Esc
  documentBody.addEventListener('keyup', (evt) => {
    const openedPopup = findOpenedPopup();
    
    if ((evt.key === 'Escape') && openedPopup) {
        closePopup(openedPopup);
      }
  });

  // Обработчики закрытия попапа кликом на оверлей
  popupOverlays.forEach(overlay => {
    overlay.addEventListener('click', (evt) => { 
      const openedPopup = findOpenedPopup();

    if (!evt.target.closest(config.popupOverlayClass) && openedPopup) {
      closePopup(openedPopup);
    }
    });
  });
}
