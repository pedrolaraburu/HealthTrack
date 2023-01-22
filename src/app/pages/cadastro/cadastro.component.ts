import { Component, EventEmitter, OnInit } from "@angular/core";
import { Output } from "@angular/core";
import { UserInterface } from "src/app/models/user.interface";
import { UserService } from "src/app/services/user.service";
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-cadastro",
    templateUrl: "./cadastro.component.html",
    styleUrls: ["./cadastro.component.scss"],
})
export class CadastroComponent implements OnInit {
    user: any = {};
    formulario: any;
    teste: boolean = true;
    showAlert: boolean = false;
    userSubmitted: boolean = false;
    @Output() registerUserEvent = new EventEmitter<UserInterface>();

    constructor(
        private fb: FormBuilder,
        private _userService: UserService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.createForm();
    }

    userData(): UserInterface {
        return (this.user = {
            id: this.id.value,
            name: this.userfName.value,
            lastName: this.userlName.value,
            email: this.emailRegister.value,
            password: this.password.value,
        });
    }

    createForm() {
        this.formulario = this.fb.group({
            id: new FormControl(Math.floor(Math.random() * 10000).toString()),
            firstName: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
            ]),
            lastName: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
            ]),
            emailRegister: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            password1: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
            ]),
            password2: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
            ]),
        });
    }
    // passwordMatches(fg: FormGroup) {
    // 	return fg.get('password1').value === fg.get('password2').value ? null :
    // 	{notmatched: true};
    // }

    onSubmit(): void {
        // console.log(this.formulario.value);
        this.userSubmitted = true;
        if (this.formulario.valid) {
			this.showAlert = false;
            this._userService.addUser(this.userData());
            this.formulario.reset();
            this.userSubmitted = false;
            this._userService.emitChange(true);
        } else {
            this.showAlert = true;
        }
    }

    //Getters do formulário
    get id() {
        return this.formulario.get("id") as FormControl;
    }

    get userfName() {
        return this.formulario.get("firstName") as FormControl;
    }

    get userlName() {
        return this.formulario.get("lastName") as FormControl;
    }

    get emailRegister() {
        return this.formulario.get("emailRegister") as FormControl;
    }

    get password() {
        return this.formulario.get("password1") as FormControl;
    }

    get passwordConfirm() {
        return this.formulario.get("password2") as FormControl;
    }
}
