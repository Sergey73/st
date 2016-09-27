import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Fire } from '../../utils/fire';


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController, private fire: Fire) {

  }

  onLogin() {
    this.fire.login('streetCity73@gmail.com', '671310', (res) => {
      console.dir(res);
    }, (err) => {
      console.dir(err);
    });
  }

  
}
