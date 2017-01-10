import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Fire } from '../../utils/fire';
import { MenuPage } from '../menu/menu';

// for develop
// import { MapPage } from '../map/map';

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  login: string = 'streetCity73@gmail.com';
  password: string = '671310';

  constructor(
    private navCtrl: NavController, 
    params: NavParams,
    private fire: Fire
  ) {

  }

  onTest() {
    this.fire.auth();
  }

  onLogin() {
    this.fire.login(this.login, this.password, (res) => {
      // let testParams = 1;
     this.navCtrl.setRoot(MenuPage); // old
     //develop
      // this.navCtrl.setRoot(MapPage, { testParams } );
    }, (err) => {
      console.dir(err);
    });
  }

  onCreateUser() {
    this.fire.createUser(this.login, this.password, res => {
      debugger
    }, err => {
      debugger
    });
  }
  
}
