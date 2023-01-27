export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item', 
  submitButtonSelector: '.popup__button-save', 
  inactiveButtonClass: 'popup__button-save_disabled', 
  inputErrorClass: 'popup__item_invalid',  
  errorClass: 'popup__item-error'
};

//массив карточек
export const initialCards = [
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

// Форма профиля
export const formElementProfile = document.querySelector('.popup__form_profile');

// Поля формы профиля
export const nameInput = formElementProfile.querySelector('.popup__item_input_name');
export const jobInput = formElementProfile.querySelector('.popup__item_input_job');

// Элементы, в которые должны быть вставлены значения полей
export const profileTittle = document.querySelector('.profile__tittle');
export const profileSubtitle = document.querySelector('.profile__subtitle');

// Форма Нового места
export const formElementPlace = document.querySelector('.popup__form_place');

// Поля формы Нового места
export const placeInput = formElementPlace.querySelector('.popup__item_input_place');
export const linkInput = formElementPlace.querySelector('.popup__item_input_link');

// Переменные открытия и закрытия попапов
export const profilePopupOpenButton = document.querySelector('.profile__edit-button');
export const placePopupOpenButton = document.querySelector('.profile__add-button');