import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Fire } from '../../utils/fire';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  login: string = 'streetCity73@gmail.com';
  password: string = '671310';

  constructor(private navCtrl: NavController, private fire: Fire) {

  }

  onLogin() {
    this.fire.login(this.login, this.password, (res) => {
      this.navCtrl.setRoot(MenuPage);
    }, (err) => {
      console.dir(err);
    });
  }

  
}
