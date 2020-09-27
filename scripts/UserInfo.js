export default class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name);
    this._job = document.querySelector(selectors.job);
  }

  getUserInfo() {  
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.job;
  }
}