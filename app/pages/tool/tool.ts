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
  
  trackNumber: any;
  checkedTrack: any;
  allTracksArr: any;
  allTracksObj: any;
  options: any;
  test: any;

  constructor(
    private navCtrl: NavController, 
    private fire: Fire
    // private message: Message
    ) {
      this.allTracksArr = [];
      this.fire.getTrack()
        .on('value', (data) => { 
          this.allTracksObj = data.val();
          debugger
          for (let track in this.allTracksObj) {
            this.allTracksArr.push(
              {number: track, path: this.allTracksObj[track]}
            )
          }
        }); 
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
      number: this.trackNumber,
      path: this.options.trackPath
    };

    this.fire.saveTrack(dataTrack);
  }

  showTrack() {
    console.dir(this.allTracksArr[this.checkedTrack]);
  }

}
