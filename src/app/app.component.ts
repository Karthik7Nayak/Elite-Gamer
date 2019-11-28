import { Component, OnInit, NgZone, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { ElectronService } from 'ngx-electron';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Elite-Gamer';
  constructor(private router: Router, private electronService: ElectronService, private injector: Injector, private ngzone: NgZone) {

    // this.electronService.ipcRenderer.on('login-Success', () => {
    //   console.log('login-Success');
    //   this.router.navigate(['dashboard']);
    // });
  }

  ngOnInit() {

    console.log('in ngoint of app');
    this.electronService.ipcRenderer.on('login-Success', () => {

      // this.router.navigate(['dashboard']);
      this.ngzone.run(() => {
        this.router.navigate(['dashboard'], { skipLocationChange: true });
      });

      console.log('login-Success');
    });
  }

}
