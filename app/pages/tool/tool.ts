import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector:  'tool-b',
  templateUrl: 'build/pages/tool/tool.html',
  inputs: ['options']
})
export class ToolPage {
  track: any;

  constructor(private navCtrl: NavController) {

  }

  saveTrack() {
    var that = this;
    console.log(that.track);
  }

}
