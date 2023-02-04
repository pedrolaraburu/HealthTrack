import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/core/services/user.service";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SearchPipePipe } from "src/app/core/pipes/search-pipe.pipe";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from "@angular/forms";

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
    formAppointment: FormGroup;
    userA: any = {};
    constructor(private _usersService: UserService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.loggedIn();
        this.getPacientsData();
        this.doFilterPacients();
        this.createFormAppointment();
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

    userDataAppointment(){
        return this.userA = {
            ids: {
                medicID: this.loggedinUser.id,
                pacientID: this.selectedOption
            },
            appointmentInfo: {
                motivoAppointment: this.motivoAppointment.value,
                dataAppointment: this.dataAppointment.value,
                horaAppointment: this.horaAppointment.value,
                descAppointment: this.descAppointment.value,
                medicineAppointment: this.medicineAppointment.value,
                dosageAppointment: this.dosageAppointment.value
            }
        }
    }

    createFormAppointment() {
        this.formAppointment = this.fb.group({
            motivoAppointment: new FormControl(null, [Validators.minLength(8), Validators.maxLength(8), Validators.required]),
            dataAppointment: new FormControl(null, Validators.required),
            horaAppointment: new FormControl(null, Validators.required),
            descAppointment: new FormControl(null, [Validators.minLength(16), Validators.maxLength(1024), Validators.required]),
            medicineAppointment: new FormControl(null),
            dosageAppointment: new FormControl(null, [Validators.minLength(16), Validators.maxLength(256), Validators.required]),
        });
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

    onSubmitAppointment(){
        if (this.formAppointment.valid) {
            this._usersService.addAppointment(this.userDataAppointment());
            this._usersService.emitChange(true);
            this.formAppointment.reset();
        }
    }

    //getters
    get motivoAppointment() {
        return this.formAppointment.get("motivoAppointment") as FormControl;
    }
    get dataAppointment() {
        return this.formAppointment.get("dataAppointment") as FormControl;
    }
    get horaAppointment() {
        return this.formAppointment.get("horaAppointment") as FormControl;
    }
    get descAppointment() {
        return this.formAppointment.get("descAppointment") as FormControl;
    }
    get medicineAppointment() {
        return this.formAppointment.get("medicineAppointment") as FormControl;
    }
    get dosageAppointment() {
        return this.formAppointment.get("dosageAppointment") as FormControl;
    }
}
