export default class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name);
    this._about = document.querySelector(selectors.about);
  }

  getUserInfo() {  
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
  }
}