import { Component } from '@angular/core';
import { NavController, Platform, NavParams, Events } from 'ionic-angular';
// import { Fire } from '../../utils/fire';
// import { Geolocation } from 'ionic-native';
import { ToolPage  } from '../tool/tool';
import { ToastService } from '../../utils/toast.service';


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
  public trackLayer: any;
  public featureGroup: any;
  public marker: any;
  public tool: any;
  param: any;
  options: any;

  constructor(
    private navCtrl: NavController, 
    platform: Platform, 
    // private fire: Fire,
    public params: NavParams,
    public events: Events,
    public _toastService: ToastService
  ) {
    this.param = this.params.get('testParams');
    this.options = {};

    platform.ready().then(() => {
      this.initPage();
    });

  }

  private initPage() {

    // вынести в константу
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhYnAxMDAyeGh5bnFmczh3cTRseiJ9.KVe54Q2NCigy3J0j3didAA';
    this.map = L.mapbox.map('map', 'mapbox.streets', {
      drawControl: true,
      minZoom: 9,
      // maxBounds: [[54.46605, 48.08372], [53.86225, 50.21576]]
    }).setView([54.33414, 48.42499], 9);
    
    // слой для маршрута
    this.trackLayer = L.mapbox.featureLayer().addTo(this.map);
    
    // координаты мыши показываем в tool
    this.map.on('mousemove', (e) => {
        this.options.coords = e.latlng;
    });

    this.marker = L.marker([54.4151707, 48.3257941], {
      draggable: true
    });

    // добавили маркер
    this.marker.addTo(this.map);
    this.tool = ToolPage;

    this.createTrack();
    // var watch = Geolocation.watchPosition({
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
    // var lat: any = 54.311096;
    // var lon: any = 48.3257941;
    
    // setInterval(() => {
    //   lat =  ((lat.toFixed(4) * 10000) + 2) / 10000;
    //   lon =  ((lon.toFixed(4) * 10000) + 2) / 10000;
    //   this.setPosition(lat, lon);
    // }, 3000);
    
    // подписались на событие из сокпонента tool.ts для отрисовски маршрута
    this.events.subscribe('track:show', (data) => {
      if (!data[0] || !data[0].path) {
        this._toastService.presentToast('Выберите маршрут.');
        return;
      }

      let pathStr = data[0].path;
      let path = JSON.parse(pathStr);
      this.trackLayer.setGeoJSON(path);
      // L.mapbox.featureLayer(path).addTo(this.map);
    });
  }

  private createTrack () {
    this.featureGroup = L.featureGroup().addTo(this.map);

    var drawControl = new L.Control.Draw({
      edit: {
        featureGroup: this.featureGroup
      },
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false
      }
    }).addTo(this.map);

    this.map.on('draw:created', (e) => { 
      this.showPolygonArea(e); 
      this.options.track = e;

      // сохранение полигона
      var type = e.layerType;
      var layer = e.layer;

      var shape = layer.toGeoJSON();
      var shapeForDb = JSON.stringify(shape);
      this.options.trackPath = shapeForDb;
      console.dir(`track создан!`);
      // var dataTrack = {
      //   number: 50,
      //   path: shapeForDb
      // };
      // this.fire.saveTrack(dataTrack);

      // end сохранение полигона
    });

    this.map.on('draw:edited', (e) => {
      this.showPolygonAreaEdited(e);
      this.options.track = e;
    });

    this.map.on('draw:delete', (e) => {
      console.log(`delete ${e}`);
      this.options.track = e;
    });

  }

  showPolygonAreaEdited(e) {
    e.layers.eachLayer((layer) => {
      this.showPolygonArea({ layer: layer });
    });
  }

  showPolygonArea(e) {
    this.featureGroup.clearLayers();
    this.featureGroup.addLayer(e.layer);
    // e.layer.bindPopup((LGeo.area(e.layer) / 1000000).toFixed(2) + ' km<sup>2</sup>');
    e.layer.openPopup();
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
 