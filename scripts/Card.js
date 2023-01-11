import { openPopup, imagePopup } from './index.js';

// Контейнер, где хранятся карточки
const elementContainer = document.querySelector('.elements');

// Элементы попапа Изображения
const imagePreview = document.querySelector('.popup__image');
const subtitlePreview = document.querySelector('.popup__subtitle');

export class Card {
  constructor(name, imageUrl, templateSelector) {
    this._name = name;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;
  }

  // обработчик клика на сердечко
  _handleLike = (event) => {
    event.target.classList.toggle('element__heart_liked');
  }

  // обработчик клика на корзину
  _handleTrash = (event) => {
    event.target.closest('.element').remove();
  }

  // обработчик клика на изображение карточки
  _openImagePopup = () => {
    //инициализация элементов попапа Изображения
    imagePreview.src = this._imageUrl;
    imagePreview.alt = this._name;
    subtitlePreview.textContent = this._name;
  
    openPopup(imagePopup);
  }

  // создаем карточку
  _createCard() {
    const newPlaceElement = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);

    newPlaceElement
      .querySelector('.element__tittle')
      .textContent = this._name;

    const image = newPlaceElement.querySelector('.element__image');
    image.src = this._imageUrl;
    image.alt = this._name;

    // Лайк и его слушатель событий
    const heart = newPlaceElement.querySelector('.element__heart');
    heart.addEventListener('click', this._handleLike);

    // Корзина и ее слушатель событий
    const trash = newPlaceElement.querySelector('.element__trash');
    trash.addEventListener('click', this._handleTrash);

    // Слушатель событий карточек
    image.addEventListener('click', this._openImagePopup);

    return newPlaceElement;
  }

  renderCard() {
    elementContainer.prepend(this._createCard());
  };
}