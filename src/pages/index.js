import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


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

 // Подключение форм к валидатору форм
const formValidatorProfile = new FormValidator(validationConfig, formElementProfile);
formValidatorProfile.enableValidation();

const formValidatorPlace = new FormValidator(validationConfig, formElementPlace);
formValidatorPlace.enableValidation();



function openProfilePopup() {
  //инициализация полей ввода
  const localUserInfo = userInfo.getUserInfo();
  nameInput.value = localUserInfo.user;
  jobInput.value = localUserInfo.info;

  //инициализация валидности инпутов при показе попапа 
  //(иначе в некоторых случаях валидность инпутов не соответствует значениям)
  formValidatorProfile.validateInput(nameInput);
  formValidatorProfile.validateInput(jobInput);

  //инициализация состояния кнопки "сохранить" при показе попапа 
  //(иначе в некоторых случаях состояние кнопки не соответствует полям ввода)
  formValidatorProfile.toggleButtonState();

  popupProfile.open();
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

  popupPlace.open();
}

const imagePopup = new PopupWithImage('.popup_image');
const cardClickHandler = (name, link) => {
  imagePopup.open(name, link);
};

function handleProfileSubmit(formValues) {
  userInfo.setUserInfo({user: formValues.name, info: formValues.job});

  const localUserInfo = userInfo.getUserInfo();
  profileTittle.textContent = localUserInfo.user;
  profileSubtitle.textContent = localUserInfo.info;
  
}

function handlePlaceSubmit(formValues) {
  const newCard = new Card(formValues.place, formValues.link, '.element_template', cardClickHandler);
  section.addItem(newCard.createCard());
}

const popupProfile = new PopupWithForm('.popup_profile', handleProfileSubmit);
const popupPlace = new PopupWithForm('.popup_place', handlePlaceSubmit);

const section = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.element_template', cardClickHandler);
    const cardElement = card.createCard();
    section.addItem(cardElement);
  }
}, '.elements');

// Подключаем слушателей событий на открытия и закрытия попапов
profilePopupOpenButton.addEventListener('click', openProfilePopup);
placePopupOpenButton.addEventListener('click', openPlacePopup);

imagePopup.setEventListeners();
popupPlace.setEventListeners();
popupProfile.setEventListeners();

section.renderItems();

const userInfo = new UserInfo({userSelector:'.profile__tittle', infoSelector: '.profile__subtitle'});