import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Fire } from '../../utils/fire';
// import { Message } from '../../utils/message';


@Component({
  templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {
  profile: any;
  // options: any;

  constructor(
    private navCtrl: NavController, 
    private fire: Fire,
    public events: Events
    // private message: Message
    ) {
      this.profile = {};
      // this.fire.getTrack()
      //   .on('value', (data) => { 
      //     this.allTracksArr = [];
      //     this.allTracksObj = data.val();
      //     debugger
      //     for (let track in this.allTracksObj) {
      //       this.allTracksArr.push(
      //         {number: track, path: this.allTracksObj[track].path}
      //       );
      //     }
      //   }); 
      this.getProfileData();
  }

  getProfileData() {
    this.fire.getUserProfile()        
    .on('value', (data) => { 
      this.profile = data.val();
    });
  }

  saveProfileData() {
    // this.fire.saveUserProfile(this.profile);
  }
 
 
  // presentAlert(title, message) {
  //   let alert = this.alertCtrl.create({
  //     title: title,
  //     subTitle: message,
  //     buttons: ['Ok!']
  //   });
  //   alert.present();
  // }

  // saveTrack() {
  //   if (!this.options.trackPath) {
  //     alert('Введите маршрут!')
  //     //  this.message.presentAlert('Предупреждение', 'Маршрут не введен!');
  //      return;
  //   }

  //   let dataTrack = {
  //     number: this.trackNumber,
  //     path: this.options.trackPath
  //   };

  //   this.fire.saveTrack(dataTrack);
  // }

  // showTrack() {
  //   // передаем путь в компонент map.ts для отображения на карте
  //   this.events.publish('track:show', this.allTracksArr[this.checkedTrack]);
  // }

}
