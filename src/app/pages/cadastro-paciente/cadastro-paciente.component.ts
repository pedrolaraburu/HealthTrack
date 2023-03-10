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
    selector: "app-cadastro-paciente",
    templateUrl: "./cadastro-paciente.component.html",
    styleUrls: ["./cadastro-paciente.component.scss"],
})
export class CadastroPacienteComponent implements OnInit, OnDestroy {
    userR: registerIdInterface;
    formularioCadastro: FormGroup;
    valorSwitch: boolean = false;
    idMedicoLogado: string;
    cepPaciente: any = [];
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
    formCheckbox: FormGroup;
    ngOnInit(): void {
        this.loggedIn();
        this.createFormIdentificacao();
        this.createCheckboxForm();
    }

    ngOnDestroy(): void {
        
    }

    userDataId(): registerIdInterface {
        console.log(this.cidade.value)
        return (this.userR = {
            ids: {
                medicID: this.idMedicoLogado,
                pacientID: Math.floor(Math.random() * 10000).toString(),
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
                rg: new FormControl(null, [Validators.maxLength(20), Validators.required]),
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
        console.log(this.formularioCadastro.value);
        console.log(this.userDataId());
        if (this.formularioCadastro.valid) {
            this._usersService.addPacient(this.userDataId());
            this._usersService.emitChange(true);
            this.formularioCadastro.reset();
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
            }
        });
    }

    // Getters do formul??rio de identifica????o
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
