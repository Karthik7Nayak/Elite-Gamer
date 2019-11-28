import { Component, OnInit } from '@angular/core';
import { DefaultGames } from '../../models/gameData';
import { Router } from '@angular/router';
// import {ipcRenderer} from 'electron';
import { ElectronService } from 'ngx-electron';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gamesData;
  constructor(private router: Router, private electronService: ElectronService) {
    this.gamesData = DefaultGames;
  }

  ngOnInit() {
    // this.router.navigate(['dashboard']);

  }

  onGameClick(gameID) {
    this.router.navigate(['performance'], { queryParams: { gameID: gameID } });

  }
  onLogin() {
    // ipcRenderer.send('login-user','');
    this.electronService.ipcRenderer.send('login-user');

  }
}
