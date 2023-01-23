import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loggedinUser: string;
  ngOnInit(): void {
    this.loggedIn();
  }

  loggedIn() {
    this.loggedinUser = localStorage.getItem('token') as string;
    return this.loggedinUser
  }

  logout() {
    localStorage.removeItem('token');
  }
}
