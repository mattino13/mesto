import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item', 
  submitButtonSelector: '.popup__button-save', 
  inactiveButtonClass: 'popup__button-save_disabled', 
  inputErrorClass: 'popup__item_invalid',  
  errorClass: 'popup__item-error'
};

//массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Контейнер, где хранятся карточки
const elementContainer = document.querySelector('.elements');

// Элементы попапа Изображения
export const imagePreview = document.querySelector('.popup__image');
export const subtitlePreview = document.querySelector('.popup__subtitle');

// Попап профиля
const profilePopup = document.querySelector('.popup_profile');
// Попап Нового места
const placePopup = document.querySelector('.popup_place');
// Попап Изображения
export const imagePopup = document.querySelector('.popup_image');

// Форма профиля
const formElementProfile = document.querySelector('.popup__form_profile');

// Поля формы профиля
const nameInput = formElementProfile.querySelector('.popup__item_input_name');
const jobInput = formElementProfile.querySelector('.popup__item_input_job');

// Элементы, в которые должны быть вставлены значения полей
const profileTittle = document.querySelector('.profile__tittle');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Форма Нового места
const formElementPlace = document.querySelector('.popup__form_place');

// Поля формы Нового места
const placeInput = formElementPlace.querySelector('.popup__item_input_place');
const linkInput = formElementPlace.querySelector('.popup__item_input_link');

// Переменные открытия и закрытия попапов
const profilePopupOpenButton = document.querySelector('.profile__edit-button');

const placePopupOpenButton = document.querySelector('.profile__add-button');

const profilePopupCloseButton = document.querySelector('.popup__button-close_profile');

const placePopupCloseButton = document.querySelector('.popup__button-close_place');

const imagePopupCloseButton = document.querySelector('.popup__button-close_image');

const allPopups = [... document.querySelectorAll('.popup')];


/////////////////////////
// Функции

function openProfilePopup() {
  //инициализация полей ввода
  nameInput.value = profileTittle.textContent;
  jobInput.value = profileSubtitle.textContent;

  //инициализация валидности инпутов при показе попапа 
  //(иначе в некоторых случаях валидность инпутов не соответствует значениям)
  formValidatorProfile.validateInput(nameInput);
  formValidatorProfile.validateInput(jobInput);

  //инициализация состояния кнопки "сохранить" при показе попапа 
  //(иначе в некоторых случаях состояние кнопки не соответствует полям ввода)
  formValidatorProfile.toggleButtonState();

  openPopup(profilePopup);
}

function openPlacePopup() {
  //очистка полей ввода
  placeInput.value = '';
  linkInput.value = '';

  //инициализация валидности инпутов при показе попапа 
  //(иначе в некоторых случаях валидность инпутов не соответствует значениям)
  formValidatorPlace.hideInputError(placeInput);
  formValidatorPlace.hideInputError(linkInput);

  //инициализация состояния кнопки "сохранить" при показе попапа 
  //(иначе в некоторых случаях состояние кнопки не соответствует полям ввода)
  formValidatorPlace.toggleButtonState();

  openPopup(placePopup);
}

 // Обработчики закрытия попапа нажатием на Esc
 function handleEscOnPopup(evt) {
  //ищем открытый попап
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened'); 
      closePopup(openedPopup);
    }
};

//функция показывает переданный попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscOnPopup);
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function closePlacePopup() {
  closePopup(placePopup);
}

function closeImagePopup() {
  closePopup(imagePopup);
}

//функция закрывает переданный попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscOnPopup);
}

// Обработчик «отправки» формы профиля, хотя пока
// она никуда отправляться не будет
function handleFormProfileSubmit (evt) {
    evt.preventDefault();

    // Сохранение новых значений
    profileTittle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closeProfilePopup ();
}

// Функция возвращает новый элемент карточки, созданный по имени и ссылке
function createCardElement(name, link) {
  const newCard = new Card(name, link, '.element_template');
  return newCard.createCard();
}

// Обработчик «отправки» формы Нового места, хотя пока
// она никуда отправляться не будет
function handleFormPlaceSubmit (evt) {
  evt.preventDefault(); 

  // Создаем новую карточку
  elementContainer.prepend(createCardElement(placeInput.value, linkInput.value));

  closePlacePopup ();
}

// добавляем карточки при загрузки страницы

function initCardsOnStartup() {
  initialCards.reverse().forEach((item) => {
    elementContainer.prepend(createCardElement(item.name, item.link));
  });
}

// Подключаем слушателей событий на открытия и закрытия попапов
profilePopupOpenButton.addEventListener('click', openProfilePopup);
placePopupOpenButton.addEventListener('click', openPlacePopup);
profilePopupCloseButton.addEventListener('click', closeProfilePopup);
placePopupCloseButton.addEventListener('click', closePlacePopup);
imagePopupCloseButton.addEventListener('click', closeImagePopup);

// Подключаем обработчик к форме профиля:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleFormProfileSubmit); 

// Подключаем обработчик к форме Нового места:
// он будет следить за событием “submit” - «отправка»
formElementPlace.addEventListener('submit', handleFormPlaceSubmit);

// Подключаем обработчики закрытия попапов кликом на оверлей
allPopups.forEach(popup => {
  popup.addEventListener('click', (evt) => { 
                          
  if (!evt.target.closest('.popup__overlay')) {
    closePopup(popup);
  }
  });
});

// инициализация начальных карточек
initCardsOnStartup(); 

 // Подключение форм к валидатору форм
const formValidatorProfile = new FormValidator(validationConfig, formElementProfile);
formValidatorProfile.enableValidation();

const formValidatorPlace = new FormValidator(validationConfig, formElementPlace);
formValidatorPlace.enableValidation();
