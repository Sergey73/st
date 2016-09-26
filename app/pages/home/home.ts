import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  constructor(public navCtrl: NavController) {
    let test = new Test();
    test.show('test!');
    test.remove({
      param1: 'test',
      param2: 1
    });
  }
}

class Test {
  show(message: string) {

  }

  add(param: number) {

  }

  remove(param: any) {

  }
}