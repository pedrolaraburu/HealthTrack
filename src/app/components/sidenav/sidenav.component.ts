import { Component } from "@angular/core";

import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent {
    constructor(private router: Router, library: FaIconLibrary) {
        library.addIcons(
            faList,
            faPlus,
            faHouse,
            faUserCircle,
            faRightFromBracket,
            faCalendar,
            faBookMedical,
            faMagnifyingGlass
        );
    }
    faPlus = faPlus;
    faList = faList;
    faHouse = faHouse;
    faUser = faUserCircle;
    faRightFromBracket = faRightFromBracket;
    faCalendar = faCalendar;
    faBookMedical = faBookMedical;
    faMagnifyingGlass = faMagnifyingGlass;

    logout() {
      localStorage.removeItem("token");
      this.router.navigate(["/home"]);
  }
}
