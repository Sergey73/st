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
    this.init();
  }

  init() {
    // следит за состоянием входом/выходом пользователья в систему
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser != null) {
        console.dir('пользователь авторизован!');
        this.setUserDataAuth(firebaseUser);
      } else {
        console.dir('пользователь не авторизован!');
        this.setUserDataAuth(null);
      }
     });
  }


// auth
  login(email: string, password: string, successCallback, errorCallback) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
      this.setUserDataAuth(response);
      successCallback(response);
    }).catch( error => { 
      errorCallback(error);
    }); 
  }

  logout() {
    return firebase.auth().signOut().then(response => {
      this.setUserDataAuth(null);
    }).catch(error => {
      console.dir(error);
    });
  }

  createUser(email: string, password: string, successCallback, errorCallback) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
        console.log('user object:' + response);
        // save the user data here.
        this.setUserDataAuth(response);
        successCallback(response);
    }).catch(error => {
        console.log('there was an error');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' - ' + errorMessage);
        errorCallback(error);
    });
  }
// end auth


// user profil
  setUserDataAuth(userData: any) {
    if (userData === null) {
      this.user = {};
      return;
    }
    this.user.id = userData.uid;
    this.user.email = userData.providerData[0].email;
    this.user.refreshToken = userData.refreshToken;
    this.user.isLogin = true;
  }

  saveUserProfile (data) {
    firebase.database().ref('users').child(this.user.id).update({
      // email для разработки потом удалить
      email: this.user.email,
      publicData: {
        name: data.name
      }
    });
  } 

  getUserProfile() {
    return firebase.database().ref('users').child(this.user.id).child('publicData');
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
