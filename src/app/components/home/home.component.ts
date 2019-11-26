import { Component, OnInit } from '@angular/core';
import { DefaultGames } from '../../models/gameData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gamesData;
  constructor() {
    this.gamesData = DefaultGames;
  }
  ngOnInit() {
  }

}
