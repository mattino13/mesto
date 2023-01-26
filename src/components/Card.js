export class Card {
  constructor(name, imageUrl, templateSelector, handleCardClick) {
    this._name = name;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;

    // обработчик клика на изображение карточки
    this._handleCardClick = handleCardClick;
  }

  // обработчик клика на сердечко
  _handleLike = (event) => {
    event.target.classList.toggle('element__heart_liked');
  }

  // обработчик клика на корзину
  _handleTrash = () => {
    this._newPlaceElement.remove();
    this._newPlaceElement = null;
  }

  // обработчик клика на изображение карточки
  _openImagePopup = () => {
    this._handleCardClick(this._name, this._imageUrl);
  }

  _setupEventListeners() {
    // Лайк и его слушатель событий
    const heart = this._newPlaceElement.querySelector('.element__heart');
    heart.addEventListener('click', this._handleLike);

    // Корзина и ее слушатель событий
    const trash = this._newPlaceElement.querySelector('.element__trash');
    trash.addEventListener('click', this._handleTrash);

    // Слушатель событий карточек
    this._image.addEventListener('click', this._openImagePopup.bind(this));
  }

  // возвращаем новую карточку из шаблона
  _createCardFromTemplate() {
    const newPlaceElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

   return newPlaceElement;
  }

  // создаем карточку
  createCard() {
    this._newPlaceElement = this._createCardFromTemplate();

    this._newPlaceElement.querySelector('.element__tittle').textContent = this._name;
    this._image = this._newPlaceElement.querySelector('.element__image');
    this._image.src = this._imageUrl;
    this._image.alt = this._name;

    this._setupEventListeners();

    return this._newPlaceElement;
  }

}