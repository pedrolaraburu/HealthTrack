import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
    NgForm,
} from "@angular/forms";

import { AuthService } from "src/app/services/auth.service";
import { Token } from "@angular/compiler";
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    showLoginAlert: boolean = false;
    showModal: boolean = false;
    logins: any = {};
    loginForm: any;
    userSubmitted: boolean = false;
    constructor(
        private _usersService: UserService,
        private router: Router,
        private fb: FormBuilder,
        private _authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.createLoginForm();
    }

    loginUser() {
        return (this.logins = {
            email: this.email.value,
            password: this.password.value,
        });
    }

    createLoginForm() {
        this.loginForm = this.fb.group({
            email: new FormControl('', [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
            ]),
        });
    }

    mostra() {
        alert('Função em construção!');
    }

    onSubmitLogin(loginForm : NgForm): void {
        console.log(this.loginForm.value);
        this.userSubmitted = true;
        const token = this._authService.authUser(loginForm.value)
        console.log(token)
        if (token) {
          const tokenUser = this._authService.getNome(loginForm.value)
          localStorage.setItem('token', tokenUser.name + " " + tokenUser.lastName)
          // console.log('Logado com sucesso!')
          this.router.navigate(['/dashboard']);
        } else {
          this.showLoginAlert = true;
        }
    }

    // Getters
    get email() {
        return this.loginForm.get("email").value as FormControl;
    }

    get password() {
        return this.loginForm.get("password").value as FormControl;
    }
}
