import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector:  'tool-b',
  templateUrl: 'build/pages/tool/tool.html'
})
export class ToolPage {
  params: any;
  constructor(private navCtrl: NavController) {
    this.params = 'params';
  }


  ionTest() {
    console.dir('test');
  }

}
