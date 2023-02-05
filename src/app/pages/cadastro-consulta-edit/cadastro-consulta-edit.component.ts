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
import { Router } from "@angular/router";
@Component({
    selector: "app-cadastro-consulta-edit",
    templateUrl: "./cadastro-consulta-edit.component.html",
    styleUrls: ["./cadastro-consulta-edit.component.scss"],
})
export class CadastroConsultaEditComponent implements OnInit {
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
    appointments: any = {};
	save: any = [];
    userA: any = {};
    href: string;
    showModal: boolean;
    constructor(
        private _usersService: UserService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loggedIn();
        this.getPacientsData();
        this.doFilterPacients();
        this.createFormAppointment();
        this.getNamePacient();
        this.getAppointments();
        this.fillForm();
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

    userDataAppointment() {
        return (this.userA = {
            ids: {
                medicID: this.loggedinUser.id,
                pacientID: this.href,
				appointmentID: this.save[6],
            },
            appointmentInfo: {
                motivoAppointment: this.motivoAppointment.value,
                dataAppointment: this.dataAppointment.value,
                horaAppointment: this.horaAppointment.value,
                descAppointment: this.descAppointment.value,
                medicineAppointment: this.medicineAppointment.value,
                dosageAppointment: this.dosageAppointment.value,
            },
        });
    }

    createFormAppointment() {
        this.formAppointment = this.fb.group({
            motivoAppointment: new FormControl(null, [
                Validators.minLength(8),
                Validators.maxLength(64),
                Validators.required,
            ]),
            dataAppointment: new FormControl(null, Validators.required),
            horaAppointment: new FormControl(null, Validators.required),
            descAppointment: new FormControl(null, [
                Validators.minLength(16),
                Validators.maxLength(1024),
                Validators.required,
            ]),
            medicineAppointment: new FormControl(null),
            dosageAppointment: new FormControl(null, [
                Validators.minLength(16),
                Validators.maxLength(256),
                Validators.required,
            ]),
        });
    }

    handleInput() {
        console.log(this.selectedOption);
    }

    onSubmitAppointment() {
        if (this.formAppointment.valid) {
			this._usersService.updateAppointment(this.userDataAppointment());
            this._usersService.emitChange(true);
            this.formAppointment.reset();
            // this.selectedOption = "null";
        }
    }

    onDeleteAppointment(){
        this._usersService.deleteAppointment(this.userDataAppointment());
        this.showModal = true;
    }

    getNamePacient() {
        this.href = this.router.url.slice(8, 12);
        this.fillFormSelected = this.filterPacients.filter((e: any) => {
            return e.ids.pacientID == this.href;
        });
        console.log(this.fillFormSelected);
        this.fillFormSelected.forEach((element: any) => {
            this.msgConsulta = element.basicInfo.fullName;
        });
    }

    getAppointments() {
        this.appointments = JSON.parse(
            localStorage.getItem("Appointments") as string
        );
        // console.log(this.pacients);
        this.appointments = this.appointments.filter((e: any) => {
            return e.ids.pacientID == this.href;
        });
        console.log(this.appointments);
        return this.appointments;
    }

    fillForm() {
		this.appointments.forEach((element: any) => {
			this.save.push(element.appointmentInfo.motivoAppointment as string);
			this.save.push(element.appointmentInfo.dataAppointment as string);
			this.save.push(element.appointmentInfo.horaAppointment as string);
			this.save.push(element.appointmentInfo.descAppointment as string);
			this.save.push(element.appointmentInfo.medicineAppointment as string);
			this.save.push(element.appointmentInfo.dosageAppointment as string);
			this.save.push(element.ids.appointmentID as string)
		});
        this.formAppointment.patchValue({
            motivoAppointment: this.save[0],
            dataAppointment: this.save[1],
            horaAppointment: this.save[2],
            descAppointment: this.save[3],
            medicineAppointment: this.save[4],
            dosageAppointment: this.save[5],
        });
    }

    navigateProntuario(){
        this.showModal = false;
        this.router.navigate(['/dashboard/exibir/', this.href]);
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
