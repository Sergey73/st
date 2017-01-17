import {Injectable} from '@angular/core';

@Injectable()

export class UserService {
  userData: any = {};

  constructor () {

  }

  setUserData(data) {
    for (let key in data) {
      this.userData[key] = data[key];
    }
  }

  getUserData() {
    return this.userData;
  }
}