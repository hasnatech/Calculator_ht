import { Component } from '@angular/core';
import { security } from 'ht-security';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = 'calculator';

  constructor() { }

  ngAfterViewInit(): void {
    security({
      mode: "development"
    })
}
}
