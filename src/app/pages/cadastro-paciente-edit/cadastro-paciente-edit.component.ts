import { UserService } from "src/app/core/services/user.service";
import { registerIdInterface } from "src/app/models/registerIdentification-interface";
import { CepService } from "src/app/core/services/cep.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
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
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
} from "@angular/forms";
@Component({
    selector: "app-cadastro-paciente-edit",
    templateUrl: "./cadastro-paciente-edit.component.html",
    styleUrls: ["./cadastro-paciente-edit.component.scss"],
})
export class CadastroPacienteEditComponent implements OnInit {
    userR: registerIdInterface;
    formularioCadastro: FormGroup;
    valorSwitch: boolean = false;
    idMedicoLogado: string;
    cepPaciente: any = [];
    href: string;
    fillFormCadastro: any = {};
    pacients: any = {};
    filterPacients: any = {};
    constructor(
        private router: Router,
        library: FaIconLibrary,
        private fb: FormBuilder,
        private _usersService: UserService,
        private cepService: CepService
    ) {
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
        _usersService.changeEmitted$.subscribe((e) => {
            this.cepPaciente = e;
            this.fillForm();
        });
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
    save: any = [];
    showModal: boolean;
    showModalDelete: boolean;
    formCheckbox: FormGroup;
    ngOnInit(): void {
        this.loggedIn();
        this.createFormIdentificacao();
        this.createCheckboxForm();
        this.getPacientsData();
        this.doFilterPacients();
        this.filterPacientData();
        this.fillFormWithFilteredData();

    }

    ngOnDestroy(): void {}

    userDataId(): registerIdInterface {
        return (this.userR = {
            ids: {
                medicID: this.idMedicoLogado,
                pacientID: this.save[4].pacientID,
            },
            basicInfo: {
                fullName: this.nomePaciente.value,
                gender: this.generoPaciente.value,
                birthDate: this.dataNasc.value,
                cpf: this.cpfCadastro.value,
                rg: this.rgCadastro.value,
                civilState: this.estadoCivilPaciente.value,
                telephone: this.telefoneCadastro.value,
                email: this.emailCadastro.value,
                naturality: this.naturalidadeCadastro.value,
            },
            convenioInfo: {
                nameConvenio: this.nameConvenio.value,
                nCarteira: this.nCarteira.value,
                expirationDate: this.expirationDate.value,
            },
            addressInfo: {
                cep: this.cep.value,
                cidade: this.cidade.value,
                estado: this.estado.value,
                logradouro: this.logradouro.value,
                numberAdress: this.numberAdress.value,
                complementoAdress: this.complementoAdress.value,
                bairroAdress: this.bairroAdress.value,
                pointOfReference: this.pointOfReference.value,
            },
            extraInfo: {
                emergencyContact: this.emergencyContact.value,
                listOfAlergies: this.listOfAlergies.value,
            },
        });
    }

    loggedIn() {
        this.loggedinUser = JSON.parse(localStorage.getItem("token") as string);
        this.idMedicoLogado = this.loggedinUser.id;
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
        });
        return this.filterPacients;
    }

    createFormIdentificacao() {
        this.formularioCadastro = this.fb.group({
            basicInfo: this.fb.group({
                fullName: new FormControl(null, [
                    Validators.minLength(8),
                    Validators.maxLength(64),
                    Validators.required,
                ]),
                gender: new FormControl(null, Validators.required),
                birthDate: new FormControl(null, Validators.required),
                cpf: new FormControl(null, Validators.required),
                rg: new FormControl(null, Validators.required),
                civilState: new FormControl(null, Validators.required),
                telephone: new FormControl(null, Validators.required),
                emailIdentification: new FormControl(null, Validators.email),
                naturality: new FormControl(null, [
                    Validators.minLength(8),
                    Validators.maxLength(64),
                    Validators.required,
                ]),
            }),
            convenioInfo: this.fb.group({
                nameConvenio: new FormControl(null),
                nCarteira: new FormControl(null),
                expirationDate: new FormControl(null),
            }),
            addressInfo: this.fb.group({
                cep: new FormControl(null, Validators.required),
                cidade: new FormControl(null, Validators.required),
                estado: new FormControl(null, Validators.required),
                logradouro: new FormControl(null, Validators.required),
                numberAdress: new FormControl(null, Validators.required),
                complementoAdress: new FormControl(null, Validators.required),
                bairroAdress: new FormControl(null, Validators.required),
                pointOfReference: new FormControl(null),
            }),
            extraInfo: this.fb.group({
                emergencyContact: new FormControl(null, Validators.required),
                listOfAlergies: new FormControl(null),
            }),
        });
    }



    onSubmit(): void {
        if (this.formularioCadastro.valid) {
            this._usersService.updatePacient(this.userDataId());
            this._usersService.emitChange(true);
            // this.formularioCadastro.reset();
        }
    }

    onDeletePacient(): void {
        const indexA = this._usersService.checkAppointments(this.userDataId());
        const indexE = this._usersService.checkExams(this.userDataId());
        console.log(indexA, indexE)
        if((indexA && indexE) != -1) {
            this._usersService.deletePacient(this.userDataId());
            this.showModal = true;
        } else {
            this.showModalDelete = true;
        }
    }

    fillForm() {
        this.formularioCadastro.patchValue({
            addressInfo: {
                cidade: this.cepPaciente[4],
                estado: this.cepPaciente[5],
                logradouro: this.cepPaciente[1],
                complementoAdress: this.cepPaciente[2],
                bairroAdress: this.cepPaciente[3],
            },
        });
    }

    filterPacientData() {
        this.href = this.router.url.slice(16, 20);
        this.fillFormCadastro = this.filterPacients.filter((e: any) => {
            return e.ids.pacientID == this.href;
        });
    }

    fillFormWithFilteredData() {
        this.fillFormCadastro.forEach((element: any) => {
            this.save.push(element.basicInfo as string);
            this.save.push(element.addressInfo as string);
            this.save.push(element.convenioInfo as string);
            this.save.push(element.extraInfo as string);
            this.save.push(element.ids as string);
        });
        this.formularioCadastro.patchValue({
            basicInfo: {
                fullName: this.save[0].fullName,
                gender: this.save[0].gender,
                birthDate: this.save[0].birthDate,
                cpf: this.save[0].cpf,
                rg: this.save[0].rg,
                civilState: this.save[0].civilState,
                telephone: this.save[0].telephone,
                emailIdentification: this.save[0].email,
                naturality: this.save[0].naturality,
            },
            convenioInfo: {
                nameConvenio: this.save[2].nameConvenio,
                nCarteira: this.save[2].nCarteira,
                expirationDate: this.save[2].expirationDate,
            },
            addressInfo: {
                cep: this.save[1].cep,
                cidade: this.save[1].cidade,
                estado: this.save[1].estado,
                logradouro: this.save[1].logradouro,
                numberAdress: this.save[1].numberAdress,
                complementoAdress: this.save[1].complementoAdress,
                bairroAdress: this.save[1].bairroAdress,
                pointOfReference: this.save[1].pointOfReference,
            },
            extraInfo: {
                emergencyContact: this.save[3].emergencyContact,
                listOfAlergies: this.save[3].listOfAlergies,
            },
        });
    }

    navigateDashboard() {
        this.router.navigate(["/dashboard"]);
        this.showModal = false;
    }

    // Getters do formulário de identificação
    //Basic info
    get nomePaciente() {
        return this.formularioCadastro
            .get("basicInfo")
            ?.get("fullName") as FormControl;
    }
    get generoPaciente() {
        return this.formularioCadastro
            .get("basicInfo")
            ?.get("gender") as FormControl;
    }
    get dataNasc() {
        return this.formularioCadastro
            .get("basicInfo")
            ?.get("birthDate") as FormControl;
    }
    get cpfCadastro() {
        return this.formularioCadastro
            .get("basicInfo")
            ?.get("cpf") as FormControl;
    }
    get rgCadastro() {
        return this.formularioCadastro
            .get("basicInfo")
            ?.get("rg") as FormControl;
    }
    get estadoCivilPaciente() {
        return this.formularioCadastro
            .get("basicInfo")
            ?.get("civilState") as FormControl;
    }
    get telefoneCadastro() {
        return this.formularioCadastro
            .get("basicInfo")
            ?.get("telephone") as FormControl;
    }
    get emailCadastro() {
        return this.formularioCadastro
            .get("basicInfo")
            ?.get("emailIdentification") as FormControl;
    }
    get naturalidadeCadastro() {
        return this.formularioCadastro
            .get("basicInfo")
            ?.get("naturality") as FormControl;
    }
    // Convenio Info
    get nameConvenio() {
        return this.formularioCadastro
            .get("convenioInfo")
            ?.get("nameConvenio") as FormControl;
    }
    get nCarteira() {
        return this.formularioCadastro
            .get("convenioInfo")
            ?.get("nCarteira") as FormControl;
    }
    get expirationDate() {
        return this.formularioCadastro
            .get("convenioInfo")
            ?.get("expirationDate") as FormControl;
    }

    // Adress info
    get cep() {
        return this.formularioCadastro
            .get("addressInfo")
            ?.get("cep") as FormControl;
    }
    get cidade() {
        return this.formularioCadastro
            .get("addressInfo")
            ?.get("cidade") as FormControl;
    }
    get estado() {
        return this.formularioCadastro
            .get("addressInfo")
            ?.get("estado") as FormControl;
    }
    get logradouro() {
        return this.formularioCadastro
            .get("addressInfo")
            ?.get("logradouro") as FormControl;
    }
    get numberAdress() {
        return this.formularioCadastro
            .get("addressInfo")
            ?.get("numberAdress") as FormControl;
    }
    get complementoAdress() {
        return this.formularioCadastro
            .get("addressInfo")
            ?.get("complementoAdress") as FormControl;
    }
    get bairroAdress() {
        return this.formularioCadastro
            .get("addressInfo")
            ?.get("bairroAdress") as FormControl;
    }
    get pointOfReference() {
        return this.formularioCadastro
            .get("addressInfo")
            ?.get("pointOfReference") as FormControl;
    }

    // Extra info
    get emergencyContact() {
        return this.formularioCadastro
            .get("extraInfo")
            ?.get("emergencyContact") as FormControl;
    }
    get listOfAlergies() {
        return this.formularioCadastro
            .get("extraInfo")
            ?.get("listOfAlergies") as FormControl;
    }

    // Getter checkbox

    get checkbox() {
        return this.formCheckbox.get("checkbox") as FormControl;
    }

    handleSwitch() {
        if (this.checkbox.value) {
            this.formularioCadastro.disable();
        } else {
            this.formularioCadastro.enable();
        }
    }
    createCheckboxForm() {
        this.formCheckbox = this.fb.group({
            checkbox: new FormControl(true, Validators.pattern("true")),
        });
    }
}
