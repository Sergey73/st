import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';


@Component({
  templateUrl: 'build/pages/menu/menu.html',
})
export class MenuPage {
  rootPage: any = HomePage;
  home: any = HomePage;
  map: any = MapPage;

  constructor(private navCtrl: NavController) {

  }

  onMenu(page) {
    this.rootPage = page;
  }

}
