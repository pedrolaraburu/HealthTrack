import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faBookMedical } from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, library: FaIconLibrary) {
    library.addIcons(faList, faPlus, faHouse, faUserCircle, faRightFromBracket, faCalendar, faBookMedical, faMagnifyingGlass);
  }
  loggedinUser: any = {};
  faPlus = faPlus;
  faList = faList;
  faHouse = faHouse;
  faUser = faUserCircle;
  faRightFromBracket = faRightFromBracket;
  faCalendar = faCalendar;
  faBookMedical = faBookMedical;
  faMagnifyingGlass = faMagnifyingGlass;
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
