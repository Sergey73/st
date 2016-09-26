import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FireLogin } from '../../utils/fire-login';


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController, private fireLogin: FireLogin) {

  }

  onLogin() {
    this.fireLogin.login('streetCity73@gmail.com', 'QaZ@EdC13', (res) => {
      alert(res);
    }, (err) => {
      alert(err);
    });
  }


}
