import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
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
    pacients: any = {};
    filterPacients: any = {};
    loggedinUser: any = {};
    lengthArray: any = 0;
    lengthArrayE: any = 0;
    lengthArrayC: any = 0;
    appointments: any = {};
    exams: any = {};
    faPlus = faPlus;
    faList = faList;
    faHouse = faHouse;
    faUser = faUserCircle;
    faRightFromBracket = faRightFromBracket;
    faCalendar = faCalendar;
    faBookMedical = faBookMedical;
    faMagnifyingGlass = faMagnifyingGlass;
    searchText : string;
    ngOnInit(): void {
        this.loggedIn();
        this.getPacientsData();
        this.doFilterPacients();
        this.getAppointments();
        this.getMedicalExams();
    }

    loggedIn() {
        this.loggedinUser = JSON.parse(localStorage.getItem("token") as string);
        return this.loggedinUser;
    }

    logout() {
        localStorage.removeItem("token");
        this.router.navigate(["/home"]);
    }

    getPacientsData() {
        this.pacients = JSON.parse(localStorage.getItem("Pacients") as string);
        return this.pacients;
    }

    doFilterPacients() {
        this.filterPacients = this.pacients.filter((e: any) => {
            return e.ids.medicID === this.loggedinUser.id;
            // console.log(e.ids.medicID, this.loggedinUser.id);
        });
        this.lengthArray = Object.keys(this.filterPacients).length;
		console.log(this.filterPacients);
		console.log(this.lengthArray);
        return this.lengthArray, this.filterPacients;
    }
    getAppointments() {
        this.appointments = JSON.parse(localStorage.getItem("Appointments") as string);
        if (this.appointments == null){
        } else {
            this.appointments = this.appointments.filter((e: any) => {
                return e.ids.medicID == this.loggedinUser.id;
            });
            this.lengthArrayC = Object.keys(this.appointments).length;
            return this.lengthArrayC, this.appointments;
        }
    }

    getMedicalExams() {
        this.exams = JSON.parse(localStorage.getItem("Exams") as string);
        // console.log(this.exams);
        this.exams = this.exams.filter((e: any) => {
            return e.ids.medicID == this.loggedinUser.id;
        });
        this.lengthArrayE = Object.keys(this.exams).length;
        return this.lengthArrayE, this.exams;
    }
}
