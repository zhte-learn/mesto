export default class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name);
    this._about = document.querySelector(selectors.about);
    this._avatar = document.querySelector(selectors.avatar);
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
    this._avatar.src = userData.avatar;
    this._avatar.alt = `Изображение ${userData.name}`;
  }
}