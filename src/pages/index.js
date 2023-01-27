import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { validationConfig, initialCards, formElementProfile,
        nameInput, jobInput, profileTittle, profileSubtitle,
        formElementPlace, placeInput, linkInput, 
        profilePopupOpenButton, placePopupOpenButton
      } from '../components/constans.js';

const section = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.element_template', cardClickHandler);
    const cardElement = card.createCard();
    section.addItem(cardElement);
  }
}, '.elements');

const userInfo = new UserInfo({userSelector:'.profile__tittle', infoSelector: '.profile__subtitle'});

const imagePopup = new PopupWithImage('.popup_image');

const popupProfile = new PopupWithForm('.popup_profile', handleProfileSubmit);
const popupPlace = new PopupWithForm('.popup_place', handlePlaceSubmit);

// Создание объектов валидаторов форм
const formValidatorProfile = new FormValidator(validationConfig, formElementProfile);
const formValidatorPlace = new FormValidator(validationConfig, formElementPlace);

const cardClickHandler = (name, link) => {
  imagePopup.open(name, link);
};

function openProfilePopup() {
  //инициализация полей ввода
  const localUserInfo = userInfo.getUserInfo();
  nameInput.value = localUserInfo.user;
  jobInput.value = localUserInfo.info;

  //инициализация валидности инпутов и кнопки "сохранить" при показе попапа 
  formValidatorProfile.initFormOnShow();
  popupProfile.open();
}

function openPlacePopup() {
  //очистка полей ввода
  placeInput.value = '';
  linkInput.value = '';

  //инициализация валидности инпутов и кнопки "сохранить" при показе попапа 
  formValidatorPlace.initFormOnShow();
  popupPlace.open();
}

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

// Подключаем слушателей событий на открытия и закрытия попапов
profilePopupOpenButton.addEventListener('click', openProfilePopup);
placePopupOpenButton.addEventListener('click', openPlacePopup);

imagePopup.setEventListeners();
popupPlace.setEventListeners();
popupProfile.setEventListeners();

formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();

section.renderItems();
