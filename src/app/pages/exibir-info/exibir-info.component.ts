import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "src/app/core/services/user.service";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
@Component({
    selector: "app-exibir-info",
    templateUrl: "./exibir-info.component.html",
    styleUrls: ["./exibir-info.component.scss"],
})
export class ExibirInfoComponent implements OnInit {
    href: string;
    loggedinUser: any = {};
    pacients: any = {};
    appointments: any = {};
    exams: any = {};
    filterPacients: any = {};
    filterPacientbyID: any = {};
    lengthArray: any;
    lengthArrayC: any;
    lengthArrayE: any;
    faUser = faUserCircle;
    namePacient: string;
    faEdit= faEdit;
    searchText: string;
    constructor(
        private router: Router,
        library: FaIconLibrary,
        private _usersService: UserService
    ) {
        library.addIcons(faUserCircle, faMagnifyingGlass, faArrowRight);
    }

    ngOnInit(): void {
        this.loggedIn();
        this.getPacients();
        this.doFilterPacients();
        this.href = this.router.url.slice(18, 22)
        // console.log(typeof(this.href), this.href)
        this.getNamePacient();
        this.getAppointments();
        this.getMedicalExams();
    }

    loggedIn() {
        this.loggedinUser = JSON.parse(localStorage.getItem("token") as string);
        // this.idMedicoLogado = this.loggedinUser.id;
        return this.loggedinUser;
    }

    getPacients() {
        this.pacients = JSON.parse(localStorage.getItem("Pacients") as string);
        // console.log(this.pacients);
        return this.pacients;
    }

    doFilterPacients() {
        this.filterPacients = this.pacients.filter((e: any) => {
            return e.ids.medicID === this.loggedinUser.id;
            // console.log(e.ids.medicID, this.loggedinUser.id);
        });
        this.lengthArray = Object.keys(this.filterPacients).length;
        // console.log(this.filterPacients);
        return this.lengthArray, this.filterPacients;
    }

    getNamePacient(){
        this.filterPacientbyID = this.filterPacients.filter((e: any) => {
            return e.ids.pacientID == this.href;
        });
    }

    getAppointments() {
        this.appointments = JSON.parse(localStorage.getItem("Appointments") as string);
        // console.log(this.pacients);
        this.appointments = this.appointments.filter((e: any) => {
            return e.ids.pacientID == this.href;
        });
        this.lengthArrayC = Object.keys(this.appointments).length;
        return this.lengthArrayC, this.appointments;
    }

    getMedicalExams() {
        this.exams = JSON.parse(localStorage.getItem("Exams") as string);
        console.log(this.exams);
        this.exams = this.exams.filter((e: any) => {
            return e.ids.pacientID == this.href;
        });
        this.lengthArrayE = Object.keys(this.exams).length;
        return this.lengthArrayE, this.exams;
    }

    onClick() {
        this.router.navigate(['/editar/', this.href]);
    }

    onClickEdit(){
        this.router.navigate(['/editarExame/', this.href]);
    }


}
