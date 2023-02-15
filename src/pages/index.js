import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { validationConfig, formElementProfile, formElementAvatar,
        nameInput, jobInput, profileTittle, profileSubtitle,
        formElementPlace, placeInput, linkInput, avatarInput,
        profilePopupOpenButton, placePopupOpenButton, profileAvatarImage
      } from '../components/Constans.js';
import { Api } from '../components/Api.js';

// Данные пользователя
const userInfo = new UserInfo({userSelector:'.profile__tittle', infoSelector: '.profile__subtitle'});

// Попапы
const popupImage = new PopupWithImage('.popup_image');
const popupProfile = new PopupWithForm('.popup_profile', handleProfileSubmit);
const popupPlace = new PopupWithForm('.popup_place', handlePlaceSubmit);
const popupTrash = new PopupWithForm('.popup_trash', handleTrashSubmit);
const popupAvatar = new PopupWithForm('.popup_avatar', handleAvatarSubmit);

// Валидаторы форм
const formValidatorProfile = new FormValidator(validationConfig, formElementProfile);
const formValidatorPlace = new FormValidator(validationConfig, formElementPlace);
const formValidatorAvatar = new FormValidator(validationConfig, formElementAvatar);

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

function openAvatarPopup() {
  //инициализация полей ввода
  avatarInput.value = userInfo.getUserInfo().avatar;

  //инициализация валидности инпутов и кнопки "сохранить" при показе попапа 
  formValidatorAvatar.initFormOnShow();
  popupAvatar.open();
}

const cardClickHandler = (name, link) => {
  popupImage.open(name, link);
};

function actualizeUserInfoElements() {
  const userData = userInfo.getUserInfo();
  profileAvatarImage.src = userData.avatar;
  profileAvatarImage.alt = userData.user;
  profileTittle.textContent = userData.user;
  profileSubtitle.textContent = userData.info;
}

function setUserInfoFromResponse(response) {
  userInfo.setUserInfo(
    {
      user:   response.name,
      info:   response.about,
      myId:   response._id,
      avatar: response.avatar
    }
  );
}

// Обработчики сабмитов форм
function handleProfileSubmit(formValues) {
  popupProfile.setSaveButtonText('Сохранение...');
  api.setUserInfo(formValues.name, formValues.job)
    .then(result => {
      setUserInfoFromResponse(result);
      actualizeUserInfoElements();
    })
    .catch((err) => console.log(err))
    .finally(() => popupProfile.setSaveButtonText('Сохранить'));
}

function handlePlaceSubmit(formValues) {
  popupPlace.setSaveButtonText('Сохранение...');
  api.createCard(formValues.place, formValues.link)
    .then(
      res => {
        section.addItem(createNewCardElement({...res, myId: userInfo.getMyId()}));
      }
    )
    .catch((err) => console.log(err))
    .finally(() => popupPlace.setSaveButtonText('Сохранить'));
}

function handleTrashSubmit() {
  api.deleteCard(popupTrash.currentCard._id)
    .then(popupTrash.currentCard.removeCardElement())
    .catch((err) => console.log(err))
    .finally(() => { popupTrash.currentCard = undefined }); 
}

function handleAvatarSubmit() {
  popupAvatar.setSaveButtonText('Сохранение...');
  api.setUserAvatar(avatarInput.value)
    .then(result => {
      setUserInfoFromResponse(result);
      actualizeUserInfoElements();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatar.setSaveButtonText('Сохранить'));
}

// Создание карточки
function createNewCardElement(cardData) {
  const newCard = new Card(cardData, '.element_template', cardClickHandler,

  //handleDeleteClick
    (cardId) => {
      popupTrash.currentCard = newCard;
      popupTrash.open();
    },
  
  //handleLikeClick
    (cardId) => {
      api.toggleLike(cardId, !newCard.isLikedSelf())
        .then(res => {newCard.actualizeLikes(res.likes)})
        .catch((err) => console.log(err)); 
  },
  );
  return newCard.createCard();
}

// Подключаем слушателей событий на открытия и закрытия попапов
profilePopupOpenButton.addEventListener('click', openProfilePopup);
placePopupOpenButton.addEventListener('click', openPlacePopup);
profileAvatarImage.addEventListener('click', openAvatarPopup);

popupImage.setEventListeners();
popupPlace.setEventListeners();
popupProfile.setEventListeners();
popupTrash.setEventListeners();
popupAvatar.setEventListeners();

formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();
formValidatorAvatar.enableValidation();

// Объект Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '5bc5b7b3-6716-4f10-8378-7ab5f2c0643b',
    'Content-Type': 'application/json'
  }
}); 

const section = new Section(
  (item) => {section.addItem(createNewCardElement({...item, myId: userInfo.getMyId()}))}, 
  '.elements');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(result => {
    setUserInfoFromResponse(result[0]);
    actualizeUserInfoElements();
    section.renderItems(result[1].reverse());
  })
  .catch((err) => console.log(err)); 
