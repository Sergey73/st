import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Fire } from '../../utils/fire';
import { Geolocation } from 'ionic-native';

declare var mapboxgl: any;
declare var L: any;


@Component({
  templateUrl: 'build/pages/map/map.html'
})

export class MapPage {
  public map: any;
  public marker: any;

  constructor(private navCtrl: NavController, platform: Platform, private fire: Fire) {
    platform.ready().then(() => {
      this.initPage();
    });

  }

  private initPage() {
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhYnAxMDAyeGh5bnFmczh3cTRseiJ9.KVe54Q2NCigy3J0j3didAA';
    this.map = L.mapbox.map('map', 'mapbox.streets');

    this.marker = L.marker([0, 0 ], {
      draggable: true
    });
    this.marker.addTo(this.map);

    let watch = Geolocation.watchPosition({
      maximumAge: 2000, 
      timeout: 5000, 
      enableHighAccuracy: true
    });

    watch.subscribe( (resp) => {
      // console.dir(resp);
      // console.log('Latitude: '            + resp.coords.latitude          + '\n' +
      //         'Longitude: '         + resp.coords.longitude         + '\n' +
      //         'Altitude: '          + resp.coords.altitude          + '\n' +
      //         'Accuracy: '          + resp.coords.accuracy          + '\n' +
      //         'Altitude Accuracy: ' + resp.coords.altitudeAccuracy  + '\n' +
      //         'Heading: '           + resp.coords.heading           + '\n' +
      //         'Speed: '             + resp.coords.speed             + '\n' +
      //         'Timestamp: '         + resp.timestamp                + '\n');
      this.loadMap(resp.coords.latitude, resp.coords.longitude);
    });
      // this.loadMap(0,0);
  }

  // private loadMap(long, lat) {
  //   mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhYnAxMDAyeGh5bnFmczh3cTRseiJ9.KVe54Q2NCigy3J0j3didAA';

  //   new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/streets-v9',
  //     center: [long, lat],
  //     zoom: 19
  //   }); 
  // }
  private loadMap(lat, long) {

    this.map.setView([lat, long]);
    this.marker.setLatLng([lat, long]).update();

  }
}
 