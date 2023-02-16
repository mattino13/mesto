export class UserInfo {
  constructor({userSelector, infoSelector, avatarSelector}) {
    this._userElement = document.querySelector(userSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      user: this._userElement.textContent, 
      info: this._infoElement.textContent, 
      avatar: this._avatarElement.src
    };
  }

  getMyId() {
    return this._myId;
  }

  setUserInfo({user, info, myId, avatar}) {
    this._userElement.textContent = user;
    this._infoElement.textContent = info;
    this._avatarElement.src = avatar;
    this._myId = myId;
  }
}