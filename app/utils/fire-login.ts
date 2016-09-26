
declare var firebase: any;

export class FireLogin {
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
      successCallback(response);
    }, error => {
      errorCallback(error);
    });
  }
}
