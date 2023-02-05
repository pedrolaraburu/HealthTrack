import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/core/services/user.service";
import {
    faUserCircle,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-cadastro-exame-edit",
    templateUrl: "./cadastro-exame-edit.component.html",
    styleUrls: ["./cadastro-exame-edit.component.scss"],
})
export class CadastroExameEditComponent implements OnInit {
    loggedinUser: any = {};
    faUser = faUserCircle;
    faMagnifyingGlass = faMagnifyingGlass;
    searchText: any;
    pacients: any = {};
    filterPacients: any = {};
    lengthArray: any;
    selectedOption: string = "null";
    fillFormSelected: any = {};
    msgExame: string = "[Nome Paciente]";
    formularioExame: FormGroup;
    userE: any = {};
    save: any = [];
    exams: any = {};
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
        this.createFormExame();
        this.getNamePacient();
        this.getExams();
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
        });
        this.lengthArray = Object.keys(this.filterPacients).length;
        // console.log(this.filterPacients);
        return this.lengthArray, this.filterPacients;
    }

    handleInput() {
        console.log(this.selectedOption);
        this.fillFormSelected = this.filterPacients.filter((e: any) => {
            return e.ids.pacientID == this.selectedOption;
        });
        console.log(this.fillFormSelected);
        this.fillFormSelected.forEach((element: any) => {
            this.msgExame = element.basicInfo.fullName;
        });
    }

    createFormExame() {
        this.formularioExame = this.fb.group({
            nomeExame: new FormControl(null, [
                Validators.minLength(8),
                Validators.maxLength(64),
                Validators.required,
            ]),
            dataExame: new FormControl(null, Validators.required),
            horaExame: new FormControl(null, Validators.required),
            tipoExame: new FormControl(null, [
                Validators.minLength(4),
                Validators.maxLength(32),
                Validators.required,
            ]),
            laboratorioExame: new FormControl(null, [
                Validators.minLength(4),
                Validators.maxLength(32),
                Validators.required,
            ]),
            urlDocExame: new FormControl(null),
            resultadoExame: new FormControl(null, [
                Validators.minLength(16),
                Validators.maxLength(1024),
                Validators.required,
            ]),
        });
    }

    userDataExam() {
        return (this.userE = {
            ids: {
                medicID: this.loggedinUser.id,
                pacientID: this.href,
                examID: this.save[7],
            },
            examInfo: {
                pacienteNomeExame: this.msgExame,
                nomeExame: this.nomeExame.value,
                dataExame: this.dataExame.value,
                horaExame: this.horaExame.value,
                tipoExame: this.tipoExame.value,
                laboratorioExame: this.laboratorioExame.value,
                urlDocExame: this.urlDocExame.value,
                resultadoExame: this.resultadoExame.value,
            },
        });
    }

    onSubmit() {
        if (this.formularioExame.valid) {
            this._usersService.updateExams(this.userDataExam());
            this._usersService.emitChange(true);
            this.formularioExame.reset();
        }
    }

    onDeleteExam(){
        this._usersService.deleteExam(this.userDataExam());
        this.showModal = true;
    }


    getNamePacient() {
        this.href = this.router.url.slice(13, 17);
        // console.log(this.href);
        this.fillFormSelected = this.filterPacients.filter((e: any) => {
            return e.ids.pacientID == this.href;
        });
        console.log(this.fillFormSelected);
        this.fillFormSelected.forEach((element: any) => {
            this.msgExame = element.basicInfo.fullName;
        });
    }

    getExams() {
        this.exams = JSON.parse(localStorage.getItem("Exams") as string);
        // console.log(this.pacients);
        this.exams = this.exams.filter((e: any) => {
            return e.ids.pacientID == this.href;
        });
        // console.log(this.exams);
        return this.exams;
    }

    fillForm() {
        this.exams.forEach((element: any) => {
            this.save.push(element.examInfo.nomeExame as string);
            this.save.push(element.examInfo.dataExame as string);
            this.save.push(element.examInfo.horaExame as string);
            this.save.push(element.examInfo.tipoExame as string);
            this.save.push(element.examInfo.laboratorioExame as string);
            this.save.push(element.examInfo.urlDocExame as string);
            this.save.push(element.examInfo.resultadoExame as string);
            this.save.push(element.ids.examID as string);
        });
        this.formularioExame.patchValue({
            nomeExame: this.save[0],
            dataExame: this.save[1],
            horaExame: this.save[2],
            tipoExame: this.save[3],
            laboratorioExame: this.save[4],
            urlDocExame: this.save[5],
            resultadoExame: this.save[6],
        });
    }

    navigateProntuario(){
        this.showModal = false;
        this.router.navigate(['/dashboard/exibir/', this.href]);
    }

    //Getters formulario
    get nomeExame() {
        return this.formularioExame.get("nomeExame") as FormControl;
    }
    get dataExame() {
        return this.formularioExame.get("dataExame") as FormControl;
    }
    get horaExame() {
        return this.formularioExame.get("horaExame") as FormControl;
    }
    get tipoExame() {
        return this.formularioExame.get("tipoExame") as FormControl;
    }
    get laboratorioExame() {
        return this.formularioExame.get("laboratorioExame") as FormControl;
    }
    get urlDocExame() {
        return this.formularioExame.get("urlDocExame") as FormControl;
    }
    get resultadoExame() {
        return this.formularioExame.get("resultadoExame") as FormControl;
    }
}
