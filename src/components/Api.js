export class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject();
    } 
  }

  getInitialCards() {
    return fetch(this._buildUrl('/cards'), this._options)
      .then(res => this._checkResponse(res));
  }

  deleteCard(cardId) {
    const options = this._options;
    options.method = 'DELETE'; 
    return fetch(this._buildUrl(`/cards/${cardId}`), options)
      .then(res => this._checkResponse(res));
  }

  createCard(name, link) {
    const options = this._options;
    options.method = 'POST'; 
    options.body = JSON.stringify({name, link});

    return fetch(this._buildUrl('/cards'), options)
      .then(res => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(this._buildUrl('/users/me'), this._options)
      .then(res => this._checkResponse(res));
  }

  setUserInfo(name, about) {
    const options = this._options;
    options.method = 'PATCH'; 
    options.body = JSON.stringify({name, about});
    
    return fetch(this._buildUrl('/users/me'), options)
      .then(res => this._checkResponse(res));
  }

  setUserAvatar(link) {
    const options = this._options;
    options.method = 'PATCH'; 
    options.body = JSON.stringify({avatar: link});
    
    return fetch(this._buildUrl('/users/me/avatar'), options)
      .then(res => this._checkResponse(res));
  }

  toggleLike(cardId, newLikeStatus) {
    const options = this._options;
    newLikeStatus ? options.method = 'PUT' : options.method = 'DELETE'; 

    return fetch(this._buildUrl(`/cards/${cardId}/likes`), options)
      .then(res => this._checkResponse(res));
  }

  _buildUrl(suffix) {
    return this._options.baseUrl + suffix;
  }
}

