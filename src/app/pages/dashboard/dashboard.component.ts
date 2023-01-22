import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  session : any;

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    let data: any = localStorage.getItem('Users');
    this.session = JSON.parse(data);
  }
}
