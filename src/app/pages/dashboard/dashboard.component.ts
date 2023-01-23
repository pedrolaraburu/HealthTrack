import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  loggedinUser: any = {};
  ngOnInit(): void {
    this.loggedIn();
  }

  loggedIn() {
    this.loggedinUser = JSON.parse(localStorage.getItem('token') as string);
    return this.loggedinUser
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
