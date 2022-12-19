// Попап профиля
const profilePopup = document.querySelector('.popup_profile');
// Попап Нового места
const placePopup = document.querySelector('.popup_place');
// Попап Изображения
const imagePopup = document.querySelector('.popup_image');

// Форма профиля
const formElementProfile = document.querySelector('.popup__form_profile');

// Поля формы профиля
const nameInput = formElementProfile.querySelector('.popup__item_input_name');
const jobInput = formElementProfile.querySelector('.popup__item_input_job');

const buttonSaveProfile = formElementProfile.querySelector('.popup__button-save_profile');

// Элементы, в которые должны быть вставлены значения полей
const profileTittle = document.querySelector('.profile__tittle');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Форма Нового места
const formElementPlace = document.querySelector('.popup__form_place');

// Поля формы Нового места
const placeInput = formElementPlace.querySelector('.popup__item_input_place');
const linkInput = formElementPlace.querySelector('.popup__item_input_link');

const buttonSavePlace = formElementPlace.querySelector('.popup__button-save_place');

// Элементы попапа Изображения
const imagePreview = document.querySelector('.popup__image');
const subtitlePreview = document.querySelector('.popup__subtitle');

// Контейнер, где хранятся карточки
const elementContainer = document.querySelector('.elements');
// Шаблон карточки Нового места
const elementTemplate = document.querySelector('.element_template').content;

// Переменные открытия и закрытия попапов
const profilePopupOpenButton = document.querySelector('.profile__edit-button');

const placePopupOpenButton = document.querySelector('.profile__add-button');

const profilePopupCloseButton = document.querySelector('.popup__button-close_profile');

const placePopupCloseButton = document.querySelector('.popup__button-close_place');

const imagePopupCloseButton = document.querySelector('.popup__button-close_image');

const documentBody = document.querySelector('.page');

const allPopups = [... document.querySelectorAll('.popup')];


/////////////////////////
// Функции

function openProfilePopup() {
  //инициализация полей ввода
  nameInput.value = profileTittle.textContent;
  jobInput.value = profileSubtitle.textContent;

  //инициализация валидности инпутов при показе попапа 
  //(иначе в некоторых случаях валидность инпутов не соответствует значениям)
  validateInput(formElementProfile, nameInput, validationConfig);
  validateInput(formElementProfile, jobInput, validationConfig);

  //инициализация состояния кнопки "сохранить" при показе попапа 
  //(иначе в некоторых случаях состояние кнопки не соответствует полям ввода)
  toggleButtonState ([nameInput, jobInput], buttonSaveProfile, validationConfig);

  openPopup(profilePopup);
}

function openPlacePopup() {
  //очистка полей ввода
  placeInput.value = '';
  linkInput.value = '';

  //инициализация валидности инпутов при показе попапа 
  //(иначе в некоторых случаях валидность инпутов не соответствует значениям)
  hideInputError(formElementPlace, placeInput, validationConfig)
  hideInputError(formElementPlace, linkInput, validationConfig);

  //инициализация состояния кнопки "сохранить" при показе попапа 
  //(иначе в некоторых случаях состояние кнопки не соответствует полям ввода)
  toggleButtonState ([placeInput, linkInput], buttonSavePlace, validationConfig);

  openPopup(placePopup);
}

function openImagePopup(cardInfo) {
  //инициализация элементов попата Изображения
  imagePreview.src = cardInfo.link;
  imagePreview.alt = cardInfo.name;
  subtitlePreview.textContent = cardInfo.name;

  openPopup(imagePopup);
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
function openPopup(popup) {
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

// Обработчик «отправки» формы Нового места, хотя пока
// она никуда отправляться не будет
function handleFormPlaceSubmit (evt) {
  evt.preventDefault(); 

  // Сохранение переменной для вызова функции renderCard
  const newItem = new Object;
  newItem.name = placeInput.value;
  newItem.link = linkInput.value;

  renderCard(newItem);

  closePlacePopup ();
}

// добавляем карточки при загрузки страницы
function initCardsOnStartup() {
  initialCards.reverse().forEach((item) => {
    renderCard(item);
  });
}

// создаем карточку
function createCard(item) {
  const newPlaceElement = elementTemplate.cloneNode(true);
  const header = newPlaceElement.querySelector('.element__tittle');
  header.textContent = item.name;
  const image = newPlaceElement.querySelector('.element__image');
  image.src = item.link;
  image.alt = item.name;

  // Лайк и его слушатель событий
  const heart = newPlaceElement.querySelector('.element__heart');
  heart.addEventListener('click', evt => {
    evt.target.classList.toggle('element__heart_liked');
  });

  // Корзина и ее слушатель событий
  const trash = newPlaceElement.querySelector('.element__trash');
  trash.addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  // Слушатель событий карточек
  image.addEventListener('click', () => {
    openImagePopup(item);
  });

  return newPlaceElement;
}

function renderCard(item) {
  elementContainer.prepend(createCard(item));
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

initCardsOnStartup();

enableValidation(validationConfig); 
