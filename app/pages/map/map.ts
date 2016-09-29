import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Fire } from '../../utils/fire';
import { Geolocation } from 'ionic-native';

declare var mapboxgl: any;


@Component({
  templateUrl: 'build/pages/map/map.html'
})

export class MapPage {
  constructor(
    private navCtrl: NavController, platform: Platform, private fire: Fire) {
    platform.ready().then(() => {
      this.initPage();
    });

  }

  private initPage() {
    Geolocation.getCurrentPosition().then((resp) => {
    this.loadMap(resp.coords.longitude, resp.coords.latitude);
    })
    // this.loadMap(48.3113038, 54.3295861)
  }

  private loadMap(long, lat) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhYnAxMDAyeGh5bnFmczh3cTRseiJ9.KVe54Q2NCigy3J0j3didAA';

    new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [long, lat],
      zoom: 11
    }); 
  }

}
