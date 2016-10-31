import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector:  'tool-b',
  templateUrl: 'build/pages/tool/tool.html',
  inputs: ['coords']
})
export class ToolPage {
  // @Input() params: any;
  constructor(private navCtrl: NavController) {
    // this.coords = {lat: 0, lng:0};
  }


  ionTest() {
    console.dir('test');
  }

}
