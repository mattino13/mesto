export class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(this._buildUrl('/cards'), this._options)
      .then(res => res.ok ? res.json() : Promise.reject());
  }

  deleteCard(cardId) {
    const options = this._options;
    options.method = 'DELETE'; 
    return fetch(this._buildUrl(`/cards/${cardId}`), options)
      .then(res => res.ok ? res.json() : Promise.reject());
  }

  createCard(name, link) {
    const options = this._options;
    options.method = 'POST'; 
    options.body = JSON.stringify({name, link});

    return fetch(this._buildUrl('/cards'), options)
      .then(res => res.ok ? res.json() : Promise.reject());
  }

  getUserInfo() {
    return fetch(this._buildUrl('/users/me'), this._options)
      .then(res => res.ok ? res.json() : Promise.reject());
  }

  setUserInfo(name, about) {
    const options = this._options;
    options.method = 'PATCH'; 
    options.body = JSON.stringify({name, about});
    
    return fetch(this._buildUrl('/users/me'), options)
      .then(res => res.ok ? res.json() : Promise.reject());
  }

  setUserAvatar(link) {
    const options = this._options;
    options.method = 'PATCH'; 
    options.body = JSON.stringify({avatar: link});
    
    return fetch(this._buildUrl('/users/me/avatar'), options)
      .then(res => res.ok ? res.json() : Promise.reject());
  }

  toggleLike(cardId, newLikeStatus) {
    const options = this._options;
    newLikeStatus ? options.method = 'PUT' : options.method = 'DELETE'; 

    return fetch(this._buildUrl(`/cards/${cardId}/likes`), options)
      .then(res => res.ok ? res.json() : Promise.reject());
  }

  _buildUrl(suffix) {
    return this._options.baseUrl + suffix;
  }
}

