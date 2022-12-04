
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

// Элементы, в которые должны быть вставлены значения полей
const profileTittle = document.querySelector('.profile__tittle');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Форма Нового места
const formElementPlace = document.querySelector('.popup__form_place');

// Поля формы Нового места
const placeInput = formElementPlace.querySelector('.popup__item_input_place');
const linkInput = formElementPlace.querySelector('.popup__item_input_link');

// Элементы попапа Изображения
const imagePreview = document.querySelector('.popup__image');
const subtitlePreview = document.querySelector('.popup__subtitle');

// Контейнер, где хранятся карточки
const elementContainer = document.querySelector('.elements');
// Шаблон карточки Нового места
const elementTemplate = document.querySelector('.element_template').content;

// Переменные открытия и закрытия попапов и слушатели этих событий
const openProfilePopupButton = document.querySelector('.profile__edit-button');
openProfilePopupButton.addEventListener('click', openProfilePopup);

const openPlacePopupButton = document.querySelector('.profile__add-button');
openPlacePopupButton.addEventListener('click', openPlacePopup);

const closeProfilePopupButton = document.querySelector('.popup__button-close_profile');
closeProfilePopupButton.addEventListener('click', closeProfilePopup);

const closePlacePopupButton = document.querySelector('.popup__button-close_place');
closePlacePopupButton.addEventListener('click', closePlacePopup);

const closeImagePopupButton = document.querySelector('.popup__button-close_image');
closeImagePopupButton.addEventListener('click', closeImagePopup);

// Прикрепляем обработчик к форме профиля:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', formProfileSubmitHandler); 

// Прикрепляем обработчик к форме Нового места:
// он будет следить за событием “submit” - «отправка»
formElementPlace.addEventListener('submit', formPlaceSubmitHandler); 

/////////////////////////
// Функции

function openProfilePopup() {
  //инициализация полей ввода
  nameInput.value = profileTittle.textContent;
  jobInput.value = profileSubtitle.textContent;
  
  openPopup(profilePopup);
}

function openPlacePopup() {
  openPopup(placePopup);
}

function openImagePopup(link, text) {
  //инициализация элементов попата Изображения
  imagePreview.src = link;
  subtitlePreview.textContent = text;

  openPopup(imagePopup);
}

//функция показывает переданный попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  //popup.classList.add('popup_opened2');
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
function formProfileSubmitHandler (evt) {
    evt.preventDefault(); 

    // Сохранение новых значений
    profileTittle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closeProfilePopup ();
}

// Обработчик «отправки» формы Нового места, хотя пока
// она никуда отправляться не будет
function formPlaceSubmitHandler (evt) {
  evt.preventDefault(); 

  // Сохранение переменной для вызова функции initElement
  const newItem = new Object;
  newItem.name = placeInput.value;
  newItem.link = linkInput.value;

  initElement(newItem);

  closePlacePopup ();
}

// добавляем карточки при загрузки страницы
function initElements() {
  initialCards.reverse().forEach((item) => {
    initElement(item);
  });
}

// создаем карточку
function initElement(item) {
  const newPlaceElement = elementTemplate.cloneNode(true);
  const header = newPlaceElement.querySelector('.element__tittle');
  header.textContent = item.name;
  const image = newPlaceElement.querySelector('.element__image');
  image.src = item.link;

  // Лайк и его слушатель событий
  const heart = newPlaceElement.querySelector('.element__heart');
  heart.addEventListener('click', evt=>{
    evt.target.classList.toggle('element__heart_unliked');
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


  elementContainer.prepend(newPlaceElement);

}

initElements();