// Находим Popup
const popup = document.querySelector('.popup');

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__item_input_name');
const jobInput = formElement.querySelector('.popup__item_input_job');

// Ищем элементы, в которые должны быть вставлены значения полей
const profileTittle = document.querySelector('.profile__tittle');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
  nameInput.value = profileTittle.textContent;
  jobInput.value = profileSubtitle.textContent;
  
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    // Сохранение новых значений с помощью textContent
    profileTittle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closePopup ();
}

const openPopupButton = document.querySelector('.profile__edit-button');
openPopupButton.addEventListener('click', openPopup);

const closePopupButton = document.querySelector('.popup__button-close');
closePopupButton.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 