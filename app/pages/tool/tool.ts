import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Fire } from '../../utils/fire';
// import { Message } from '../../utils/message';



@Component({
  selector:  'tool-b',
  templateUrl: 'build/pages/tool/tool.html',
  inputs: ['options']
})
export class ToolPage {
  track: any;
  options: any;

  constructor(
    private navCtrl: NavController, 
    private fire: Fire
    // private message: Message
    ) {
      let trackData = this.fire.getTrack();
      
  }

  // presentAlert(title, message) {
  //   let alert = this.alertCtrl.create({
  //     title: title,
  //     subTitle: message,
  //     buttons: ['Ok!']
  //   });
  //   alert.present();
  // }

  saveTrack() {
    if (!this.options.trackPath) {
      alert('Введите маршрут!')
      //  this.message.presentAlert('Предупреждение', 'Маршрут не введен!');
       return;
    }

    let dataTrack = {
      number: this.track,
      path: this.options.trackPath
    };
  
    this.fire.saveTrack(dataTrack);
  }

}
