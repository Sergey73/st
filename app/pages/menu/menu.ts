import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'build/pages/menu/menu.html',
})

export class MenuPage {
  rootPage: any = MapPage;
  map: any = MapPage;
  profile: any = ProfilePage;

  constructor(public navCtrl: NavController) {

  }

  onMenu(page) {
    this.rootPage = page;
  }

}
