export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item', 
  submitButtonSelector: '.popup__button-save', 
  inactiveButtonClass: 'popup__button-save_disabled', 
  inputErrorClass: 'popup__item_invalid',  
  errorClass: 'popup__item-error'
};

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

// Форма аватара
export const formElementAvatar = document.querySelector('.popup__form_avatar');

// Поля формы аватара
export const avatarInput = formElementAvatar.querySelector('.popup__item_input_avatar');

// Переменные открытия и закрытия попапов
export const profilePopupOpenButton = document.querySelector('.profile__edit-button');
export const profileAvatarImage = document.querySelector('.profile__avatar');

export const placePopupOpenButton = document.querySelector('.profile__add-button');
