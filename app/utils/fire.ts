import {Injectable} from '@angular/core';

declare var firebase: any;

@Injectable()

export class Fire {
  user: any = {};

  constructor() {
    var config = {
      apiKey: 'AIzaSyD8cHdez2j1JTcQ4hfPoFs3YCsRSgtPfGY',
      authDomain: 'streetcity73-a464b.firebaseapp.com',
      databaseURL: 'https://streetcity73-a464b.firebaseio.com',
      storageBucket: 'streetcity73-a464b.appspot.com',
      messagingSenderId: '367568561460'
    };
    firebase.initializeApp(config);
  }

  login(email: string, password: string, successCallback, errorCallback) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
      this.setUser(response);
      successCallback(response);
    }, error => {
      errorCallback(error);
    });
  }

  private setUser(userData: any) {
    this.user.id = userData.uid;
    this.user.email = userData.providerData[0].email;
    this.user.refreshToken = userData.refreshToken;

    this.saveUser();
  }

  
  private saveUser() {
    firebase.database().ref('users').child(this.user.id).set({
      latitude: 1,
      longitude: 1,
      name: 'Admin'
    });
  }
}
