import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    testaGuard: boolean = false;
    constructor() {}

    authUser(user: any) {
        let UserArray = [];
        console.log(user);
        if (localStorage.getItem("Users")) {
            UserArray = JSON.parse(localStorage.getItem("Users") as string);
        }
        return (this.testaGuard = UserArray.find(
            (e: any) => e.email == user.email && e.password == user.password
        ));
    }

    authUserToken() {
        if (localStorage.getItem("token")) {
            this.testaGuard = true;
            return this.testaGuard;
        }
    }

    getNome(user: any) {
        let UserArrayy = [];
        if (localStorage.getItem("Users")) {
            UserArrayy = JSON.parse(localStorage.getItem("Users") as string);
        }
        return UserArrayy.find(
            (e: any) => e.email == user.email && e.password == user.password
        );
    }

    isLoggedIn() {
        return this.testaGuard;
    }
}
