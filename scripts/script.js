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
const openProfilePopupButton = document.querySelector('.profile__edit-button');

const openPlacePopupButton = document.querySelector('.profile__add-button');

const closeProfilePopupButton = document.querySelector('.popup__button-close_profile');

const closePlacePopupButton = document.querySelector('.popup__button-close_place');

const closeImagePopupButton = document.querySelector('.popup__button-close_image');

const documentBody = document.querySelector('.page');

const popupOverlays = [... document.querySelectorAll('.popup')];


/////////////////////////
// Функции

function openProfilePopup() {
  //инициализация полей ввода
  nameInput.value = profileTittle.textContent;
  jobInput.value = profileSubtitle.textContent;
  validateInput(nameInput, validationConfig);
  validateInput(jobInput, validationConfig);

  //инициализация кнопки сохранения
  validateButton(buttonSaveProfile, validationConfig);
  
  openPopup(profilePopup);
}

function openPlacePopup() {
  //очистка полей ввода
  placeInput.value = '';
  linkInput.value = '';
  validateInput(placeInput, validationConfig, 1);
  validateInput(linkInput, validationConfig, 1);

  //инициализация кнопки сохранения
  validateButton(buttonSavePlace, validationConfig);

  openPopup(placePopup);
}

function openImagePopup(link, text) {
  //инициализация элементов попата Изображения
  imagePreview.src = link;
  imagePreview.alt = text;
  subtitlePreview.textContent = text;

  openPopup(imagePopup);
}

//функция показывает переданный попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
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
  heart.addEventListener('click', evt=>{
    evt.target.classList.toggle('element__heart_liked');
  });

  // Корзина и ее слушатель событий
  const trash = newPlaceElement.querySelector('.element__trash');
  trash.addEventListener('click', evt=>{
    evt.target.closest('.element').remove();
  });

  // Слушатель событий карточек
  image.addEventListener('click',evt=>{
    openImagePopup(evt.target.src, evt.target.closest('.element').querySelector('.element__tittle').textContent);
  });

  return newPlaceElement;
}

function renderCard(item) {
  elementContainer.prepend(createCard(item));
}

// Подключаем слушателей событий на открытия и закрытия попапов
openProfilePopupButton.addEventListener('click', openProfilePopup);
openPlacePopupButton.addEventListener('click', openPlacePopup);
closeProfilePopupButton.addEventListener('click', closeProfilePopup);
closePlacePopupButton.addEventListener('click', closePlacePopup);
closeImagePopupButton.addEventListener('click', closeImagePopup);

// Прикрепляем обработчик к форме профиля:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleFormProfileSubmit); 

// Прикрепляем обработчик к форме Нового места:
// он будет следить за событием “submit” - «отправка»
formElementPlace.addEventListener('submit', handleFormPlaceSubmit);

initCardsOnStartup();

enableValidation(validationConfig); 
