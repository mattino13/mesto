function togglePopup (){
  const Popup = document.querySelector('.popup');
  Popup.classList.toggle('popup__popup_opened');
}

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTittle = document.querySelector('.profile__tittle');
    const profileSubtitle = document.querySelector('.profile__subtitle');

    // Вставьте новые значения с помощью textContent
    profileTittle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    togglePopup ();
}

const openPopupButton = document.querySelector('.profile__edit-button');
openPopupButton.addEventListener('click', togglePopup);

const closePopupButton = document.querySelector('.popup__button-close');
closePopupButton.addEventListener('click', togglePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 