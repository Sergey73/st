import { AlertController } from 'ionic-angular';


export class Message {
  constructor(private alertCtrl: AlertController) {

  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok!']
    });
    alert.present();
  }

}
