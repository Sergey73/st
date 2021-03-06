import { Component } from '@angular/core';
import { NavController, Platform, NavParams, Events } from 'ionic-angular';
import { Fire } from '../../utils/fire';
// import { Geolocation } from 'ionic-native';
import { ToolPage  } from '../tool/tool';
import { LoginPage } from '../../pages/login/login';
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
  loginPage: any = LoginPage;
  public map: any;
  public trackLayer: any;
  public featureGroup: any;
  public marker: any;
  public tool: any;
  param: any;
  options: any;
  public showAdminTools: boolean = false;

  constructor(
    public navCtrl: NavController, 
    platform: Platform, 
    private fire: Fire,
    public params: NavParams,
    public events: Events,
    public _toastService: ToastService
  ) {
    this.param = this.params.get('admin');
    this.options = {};
  }


  // getAdminFlag() {
  //   this.fire.getIsAdmin()
  //   .on('value', (data) => { 
  //     this.showAdminTools = true;
  //     // загрузка карты
  //     this.initMap();
  //   }, error => {
  //     this.showAdminTools = false;
  //   });
  // }

  // подключаем карту после загрузки страницы
  // срабатывает при заходе на страницу
  ionViewWillEnter () {
    console.dir(8);
    this.showAdminTools = this.fire.getIsAdmin();
    this.initMap();
  }

  // срабатывает один раз когда страница загрузилась 
  // в первый раз
  // ionViewDidLoad() {
  //   this.initMap();
  // }

  // срабатывает при заходе на страницу
  ionViewDidEnter() {console.dir(2)}


  // срабатывает при уходе со страницы
  ionViewWillUnload() {console.dir(5)}
  // срабатывает при уходе со страницы
  ionViewWillLeave() {console.dir(3)}

  ionViewDidLeave() {console.dir(4)}
  
  ionViewDidLoad() {console.dir(1)}
  ionViewCanEnter() {console.dir(6)}
  ionViewCanLeave() {console.dir(7)}

  initMap() {
    // вынести в константу
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5NzMiLCJhIjoiY2lyM3JhYnAxMDAyeGh5bnFmczh3cTRseiJ9.KVe54Q2NCigy3J0j3didAA';
    this.map = L.mapbox.map('map', 'mapbox.streets', {
      drawControl: this.showAdminTools,
      minZoom: 9,
      // maxBounds: [[54.46605, 48.08372], [53.86225, 50.21576]]
    }).setView([54.33414, 48.42499], 9);
  }

  private initPage() {
    this.initMap();
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

    this.showAdminTools ? this.createTrack() : null;
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

  // функцию перенести в login.ts сделать директиву для с кнопкой выход
  logout() {
    var callback = (response) => {
      this.navCtrl.setRoot(this.loginPage);
    };

    this.fire.logout(callback);
  }
}
 