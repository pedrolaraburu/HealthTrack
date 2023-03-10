import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "src/app/core/services/user.service";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { registerIdInterface } from "src/app/models/registerIdentification-interface";
@Component({
    selector: "app-prontuario",
    templateUrl: "./prontuario.component.html",
    styleUrls: ["./prontuario.component.scss"],
})
export class ProntuarioComponent implements OnInit {
	loggedinUser: any = {};
	pacients : any = {};
	filterPacients: any = {};
	lengthArray: any;
    faUser = faUserCircle;
    faMagnifyingGlass = faMagnifyingGlass;
    faArrowRight = faArrowRight;
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
    }

    loggedIn() {
        this.loggedinUser = JSON.parse(localStorage.getItem("token") as string);
        // this.idMedicoLogado = this.loggedinUser.id;
        return this.loggedinUser;
    }

	getPacients(){
		this.pacients = JSON.parse(localStorage.getItem('Pacients') as string);
		console.log(this.pacients);
		return this.pacients;
	}

	doFilterPacients() {
        this.filterPacients = this.pacients.filter((e: any) => {
            return e.ids.medicID === this.loggedinUser.id;
            // console.log(e.ids.medicID, this.loggedinUser.id);
        });
        this.lengthArray = Object.keys(this.filterPacients).length;
		console.log(this.filterPacients);
        return this.lengthArray, this.filterPacients;
    }
}
