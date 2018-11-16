import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  constructor(
    private navController: NavController
  ) { }

  ngOnInit() { }

  openPage(pageName: string) {
    this.navController.push(pageName);
  }
}
