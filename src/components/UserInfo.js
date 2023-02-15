export class UserInfo {
  constructor({userSelector, infoSelector}) {
    this._user = document.querySelector(userSelector).textContent;
    this._info = document.querySelector(infoSelector).textContent;
  }

  getUserInfo() {
    return {user: this._user, info: this._info, avatar: this._avatar};
  }

  getMyId() {
    return this._myId;
  }

  setUserInfo({user, info, myId, avatar}) {
    this._user = user;
    this._info = info;
    this._myId = myId;
    this._avatar = avatar;
  }
}