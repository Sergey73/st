import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Fire } from '../../utils/fire';
import { Geolocation } from 'ionic-native';
import { ToolPage  } from '../tool/tool';


// подключенные глобальные библиотеки 
declare var mapboxgl: any; 
declare var leafletDraw: any; 
declare var L: any;


@Component({
  templateUrl: 'build/pages/map/map.html',
  directives: [ToolPage]
})

export class MapPage {
  public map: any;
  public marker: any;
  public tool: any;
  param: any;
  coords: any;

  constructor(
    private navCtrl: NavController, 
    platform: Platform, 
    private fire: Fire,
    public params: NavParams) {
    this.param = this.params.get('testParams');

    platform.ready().then(() => {
      this.initPage();
    });

  }

  private initPage() {
    let that = this;

    L.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhYnAxMDAyeGh5bnFmczh3cTRseiJ9.KVe54Q2NCigy3J0j3didAA';
    this.map = L.mapbox.map('map', 'mapbox.streets', {
      drawControl: true,
      minZoom: 9,
      // maxBounds: [[54.46605, 48.08372], [53.86225, 50.21576]]
    }).setView([54.31109, 48.42499], 9);

    // координаты мыши показываем в tool
    this.map.on('mousemove', function(e) {
        that.coords = e.latlng;
    });

    this.marker = L.marker([54.4151707, 48.3257941], {
      draggable: true
    });

    // добавили маркер
    this.marker.addTo(this.map);
    this.tool = ToolPage;

    this.createTrack();
    // let watch = Geolocation.watchPosition({
    //   maximumAge: 2000, 
    //   timeout: 5000, 
    //   enableHighAccuracy: true
    // });

    // watch.subscribe( (resp) => {
    //   // console.dir(resp);
    //   // console.log('Latitude: '            + resp.coords.latitude          + '\n' +
    //   //         'Longitude: '         + resp.coords.longitude         + '\n' +
    //   //         'Altitude: '          + resp.coords.altitude          + '\n' +
    //   //         'Accuracy: '          + resp.coords.accuracy          + '\n' +
    //   //         'Altitude Accuracy: ' + resp.coords.altitudeAccuracy  + '\n' +
    //   //         'Heading: '           + resp.coords.heading           + '\n' +
    //   //         'Speed: '             + resp.coords.speed             + '\n' +
    //   //         'Timestamp: '         + resp.timestamp                + '\n');
    //   this.setPosition(resp.coords.latitude, resp.coords.longitude);
    // });
    // let lat: any = 54.311096;
    // let lon: any = 48.3257941;
    
    // setInterval(() => {
    //   lat =  ((lat.toFixed(4) * 10000) + 2) / 10000;
    //   lon =  ((lon.toFixed(4) * 10000) + 2) / 10000;
    //   this.setPosition(lat, lon);
    // }, 3000);
  }

  private createTrack () {
    let that = this;
    let featureGroup = L.featureGroup().addTo(that.map);

    let drawControl = new L.Control.Draw({
      edit: {
        featureGroup: featureGroup
      },
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false
      }
    }).addTo(that.map);

    that.map.on('draw:created', showPolygonArea);
    that.map.on('draw:edited', showPolygonAreaEdited);

    function showPolygonAreaEdited(e) {
      e.layers.eachLayer(function(layer) {
        showPolygonArea({ layer: layer });
      });
    }
    function showPolygonArea(e) {
      featureGroup.clearLayers();
      featureGroup.addLayer(e.layer);
     // e.layer.bindPopup((LGeo.area(e.layer) / 1000000).toFixed(2) + ' km<sup>2</sup>');
      e.layer.openPopup();
    }
  }
  // mapgl
  // private loadMap(long, lat) {
  //   mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhYnAxMDAyeGh5bnFmczh3cTRseiJ9.KVe54Q2NCigy3J0j3didAA';
  //   new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/streets-v9',
  //     center: [long, lat],
  //     zoom: 19
  //   }); 
  // }
  // end mapgl
  // private setPosition(lat, long) {
  //   this.map.setView([lat, long]);
  //   this.marker.setLatLng([lat, long]).update();

  // }
}
 