import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
// tslint:disable max-line-length
import { ApiService} from '../../../services/api.service';
export interface GameTableData {
  user: string;
  connections: number;
  game_location: string;
  game_city: string;
  server_location: string;
  server_city: string;
  server_speed: number;

}

const GAME_DATA: GameTableData[] = [
  {

    user: 'icesljal222', connections: 2, game_location: '68.0.179.113', game_city: 'Phoenix', server_location: '172.65.244.155', server_city: 'Chicago', server_speed: 0.10
  },
  {
    user: 'phoebette', connections: 3, game_location: '68.98.35.118', game_city: 'Phoenix', server_location: '192.64.174.65', server_city: 'California', server_speed: 0.20
  },
  {
    user: 'icesljal222', connections: 2, game_location: '68.0.179.113', game_city: 'Phoenix', server_location: '172.65.244.155', server_city: 'Chicago', server_speed: 0.10
  }
];

@Component({
  selector: 'app-data-log',
  templateUrl: './data-log.component.html',
  styleUrls: ['./data-log.component.css']
})
export class DataLogComponent implements OnInit {
  displayedColumns: string[];
  serverDetails;
  dataSource = new MatTableDataSource();
  constructor(private apiService: ApiService) {
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
}
