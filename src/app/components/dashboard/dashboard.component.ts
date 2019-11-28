import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
// tslint:disable max-line-length
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[];
  serverDetails;
  dataSource = new MatTableDataSource();
  constructor(private apiService: ApiService,private router: Router, private electronService: ElectronService) {
    this.displayedColumns = [
      'user',
      'usid',
      'game_id',
      'game_name',
      'gsid',
      'conn_id',
      'src',
      'dst',
      'avg_direct_rtt',
      'avg_wtfast_rtt'
    ];
  }

  ngOnInit() {
    this.apiService.getMapDataWithGameIDfilters(7137, 1000).subscribe(res => {
      this.serverDetails = res;
      this.dataSource = new MatTableDataSource(res);
    });
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(['']);

    this.electronService.ipcRenderer.send('logout-user');
  }

}
