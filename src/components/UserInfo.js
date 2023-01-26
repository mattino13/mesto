export class UserInfo {
  constructor({userSelector, infoSelector}) {
    this._user = document.querySelector(userSelector).textContent;
    this._info = document.querySelector(infoSelector).textContent;
  }

  getUserInfo() {
    return {user: this._user, info: this._info};
  }

  setUserInfo({user, info}) {
    this._user = user;
    this._info = info;
  }
}