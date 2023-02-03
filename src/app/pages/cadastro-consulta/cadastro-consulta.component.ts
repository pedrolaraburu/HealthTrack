import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/core/services/user.service";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SearchPipePipe } from "src/app/core/pipes/search-pipe.pipe";
@Component({
    selector: "app-cadastro-consulta",
    templateUrl: "./cadastro-consulta.component.html",
    styleUrls: ["./cadastro-consulta.component.scss"],
})
export class CadastroConsultaComponent implements OnInit {
    loggedinUser: any = {};
    faUser = faUserCircle;
    faMagnifyingGlass = faMagnifyingGlass;
    searchText: any;
    pacients: any = {};
    filterPacients: any = {};
    lengthArray: any;
    selectedOption: string = "null";
    msgConsulta: string = "[Nome Paciente]";
    fillFormSelected: any = {};
    constructor(private _usersService: UserService) {}

    ngOnInit(): void {
        this.loggedIn();
        this.getPacientsData();
        this.doFilterPacients();
    }

    loggedIn() {
        this.loggedinUser = JSON.parse(localStorage.getItem("token") as string);
        return this.loggedinUser;
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
        // console.log(this.filterPacients);
        // console.log(this.lengthArray);
        return this.lengthArray, this.filterPacients;
    }

    handleInput() {
        console.log(this.selectedOption);
        this.fillFormSelected = this.filterPacients.filter((e: any) => {
            return e.ids.pacientID == this.selectedOption;
        });
        console.log(this.fillFormSelected);
        this.fillFormSelected.forEach((element: any) => {
            this.msgConsulta = element.basicInfo.fullName;
        });
    }
}
