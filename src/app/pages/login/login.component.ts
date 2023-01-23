import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
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
        private fb: FormBuilder
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

    onSubmitLogin(): void {
        console.log(this.loginForm.value);
        this.userSubmitted = true;
        // this.usersService.getUsers().subscribe(res => {
        //   const user = res.find((e: any)=> {
        //     return e.email === this.email && e.password === this.password
        //   });
        //   if (user){
        //     this.usersService.emitChange(true);
        //     this.router.navigate(['/dashboard']);
        //     this.showLoginAlert = false;
        //   } else {
        //     this.showLoginAlert = true;
        //   }
        // })
    }

    // Getters
    get email() {
        return this.loginForm.get("email").value as FormControl;
    }

    get password() {
        return this.loginForm.get("password").value as FormControl;
    }
}
