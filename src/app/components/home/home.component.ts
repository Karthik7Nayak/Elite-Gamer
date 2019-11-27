import { Component, OnInit } from '@angular/core';
import { DefaultGames } from '../../models/gameData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gamesData;
  constructor(private router: Router) {
    this.gamesData = DefaultGames;
  }

  ngOnInit() {
  }

  onGameClick(gameID) {
    this.router.navigate(['performance'], { queryParams: { gameID: gameID } });
  }
}
