import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Fire } from '../../utils/fire';

declare var mapboxgl: any;

@Component({
  templateUrl: 'build/pages/map/map.html',
})
export class MapPage {
  map: any;
  // items: any = [1, 2, 3, 4, 5];

  constructor(
    private navCtrl: NavController, private fire: Fire
    ) {

    this.initPage();
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhYnAxMDAyeGh5bnFmczh3cTRseiJ9.KVe54Q2NCigy3J0j3didAA';
    window.setTimeout(() => {
      this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9'
      });
    }, 5000);
  }

  initPage() {
   
  }


}
