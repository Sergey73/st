import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Fire } from '../../utils/fire';
import { MenuPage } from '../menu/menu';
import { ToastService } from '../../utils/toast.service';


@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  login: string = 'streetCity73@gmail.com';
  password: string = '671310';

  constructor(
    public navCtrl: NavController, 
    params: NavParams,
    public fire: Fire,
    public _toastService: ToastService,
    public events: Events
  ) {
    this.events.subscribe('menu:mapPage', (data) => {
      this.goToMapPage();
    });
  }

  goToMapPage() {
    this.navCtrl.setRoot(MenuPage); 
  }


  onLogin() {
    if (!this.login || !this.password) {
      this._toastService.presentToast('Введите логин и пароль!');
      return;
    }
    this.fire.login(this.login, this.password, (res) => {
      this.goToMapPage();
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

  onLogout() {
    this.fire.logout().then(response => {

    });
  }

  onTest() {
    this.fire.auth();
  }
  
}
