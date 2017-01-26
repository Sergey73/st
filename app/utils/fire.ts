import {Injectable} from '@angular/core';
import { Events } from 'ionic-angular';

declare var firebase: any;

@Injectable()

export class Fire {
  user: any = {};

  constructor(public events: Events) {
    var config = {
      apiKey: 'AIzaSyD8cHdez2j1JTcQ4hfPoFs3YCsRSgtPfGY',
      authDomain: 'streetcity73-a464b.firebaseapp.com',
      databaseURL: 'https://streetcity73-a464b.firebaseio.com',
      storageBucket: 'streetcity73-a464b.appspot.com',
      messagingSenderId: '367568561460'
    };
    firebase.initializeApp(config);
  }

  // // проверка на является ли пользователь админом
  // getIsAdmin() {
  //   return firebase.database().ref('admins').child(this.user.id);
  // }

  // перенести в login.ts и удалить goToMapPage из fire.ts
  init(successCallback) {
    // следит за состоянием входом/выходом пользователья в систему
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser != null) {
        console.dir('пользователь ' + firebaseUser.email + ' авторизован!');
        this.setUserDataAuth(firebaseUser);
        this.getUserData(successCallback);

      } else {
        console.dir('пользователь не авторизован!');
        this.clearUserDataAuth();
      }
     });
  }

  // goToMapPage() {
  //   this.events.publish('menu:mapPage');
  // }

// auth

  login(email: string, password: string, successCallback) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
      this.setUserDataAuth(response);
      this.getUserData(successCallback);
    }).catch( error => { 
      console.dir(error);
    }); 
  }

  logout(successCallback) {
    return firebase.auth().signOut().then(response => {
      this.clearUserDataAuth();
      successCallback(response);
    }).catch(error => {
      console.dir(error);
    });
  }

  createUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
        console.log('user object:' + response);
        console.dir('user with email: ' + response.providerData[0].email +  ' created!')
    }).catch(error => {
        console.log('there was an error');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' - ' + errorMessage);
    });
  }
// end auth


// user profil

  // после получения данных пользователя и записи их в user
  // выполняем callback
  getUserData(callback) {
    return firebase.database().ref('users').child(this.user.id)
    .on('value', (data) => { 
      var userData = data.val();
      this.setUserDataRole(userData);
      callback();
    });
  }
  
  setUserDataRole(userData: any) {
    switch(userData.role) {
      case 1001: 
        this.user.role = 'admin';
        break;
      case 1: 
        this.user.role = 'user';
        break;
      default:
        this.user.role = 'anon';
    }
  }

  setUserDataAuth(userData: any) {
    this.user.id = userData.uid;
    this.user.email = userData.providerData[0].email;
    this.user.refreshToken = userData.refreshToken;
  }

  clearUserDataAuth() {
      this.user = {};
      return;
  }

  getUserProfile() {
    return firebase.database().ref('users').child(this.user.id).child('publicData');
  }

 
  getIsAdmin() {
    let role = this.user.role && this.user.role == 'admin' ? true : false; 
    return role;
  }
// end user

  
// track
  getTrack() {
    return firebase.database().ref('tracks');
  }

  saveTrack(data) {
    firebase.database().ref('tracks').child(data.number).set({
      path: data.path
    });
  }
// end track

// test
  auth() {
    debugger;

    // firebase.auth().signInAnonymously().then( x => {
    //   var rootRef = firebase.database().ref();
    //   debugger;
    // });
  }  
// end test
  

}
