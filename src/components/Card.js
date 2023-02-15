export class Card {
  constructor(cardData, templateSelector, handleCardClick, handleDeleteClick, handleLikeCkick) {
    this._name = cardData.name;
    this._imageUrl = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._owner = cardData.owner;
    this._myId = cardData.myId;
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCkick = handleLikeCkick;
  }

  // обработчик клика на сердечко
  _handleLike = (event) => {
    event.target.classList.toggle('element__heart_liked');
  }

  // я лайкала эту карточку
  isLikedSelf() {
    return this._likes.find(item => {return item._id === this._myId}) === undefined ? 0 : 1;
  }

  removeCardElement() {
    this._newPlaceElement.remove();
    this._newPlaceElement = null;
  }

  // обработчик клика на изображение карточки
  _openImagePopup = () => {
    this._handleCardClick(this._name, this._imageUrl);
  }

  // настройка слушателей событий и внешнего вида карточки
  _setupCardElement() {
    // Лайк и его слушатель событий
    this._heartElement.addEventListener('click', () => this._handleLikeCkick(this._id));

    //счетчик лайков
    this._actualizeLikeElements();

    // корзина и ее слушатель событий
    const trash = this._newPlaceElement.querySelector('.element__trash');
    if (this._myId == this._owner._id) {
      trash.addEventListener('click', () => this._handleDeleteClick(this._id));
      trash.classList.remove('element__trash_non');
    }
    
    // слушатель событий карточек
    this._image.addEventListener('click', this._openImagePopup.bind(this));
  }

  // обновить счетчик лайков для карточки 
  actualizeLikes(newLikes) {
    this._likes = newLikes;
    this._actualizeLikeElements();
  }

  // актуализировать визуализацию счетчика лайков
  _actualizeLikeElements() {
    if (this.isLikedSelf()) {
      this._heartElement.classList.add('element__heart_liked')
    } else {
      this._heartElement.classList.remove('element__heart_liked');
    }

    if (this._likes.length > 0) {
      this._likesCounterElement.textContent = this._likes.length;
    } else {
      this._likesCounterElement.textContent = '';
    }
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

    this._heartElement = this._newPlaceElement.querySelector('.element__heart');
    this._likesCounterElement = this._newPlaceElement.querySelector('.element__counter');
    this._newPlaceElement.querySelector('.element__tittle').textContent = this._name;
    this._image = this._newPlaceElement.querySelector('.element__image');
    this._image.src = this._imageUrl;
    this._image.alt = this._name;

    this._setupCardElement();

    return this._newPlaceElement;
  }

}