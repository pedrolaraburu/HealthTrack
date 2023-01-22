import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserInterface } from "../models/user.interface";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
@Injectable({
    providedIn: "root",
})
export class UserService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    };
    constructor(private http: HttpClient, private router: Router) {}

    addUser(user: UserInterface) {
        let users = [];
        if(localStorage.getItem('Users')) {
            users = JSON.parse(localStorage.getItem('Users') as string);
            users = [...users, user];

        } else {
            users = [user];
        }
        localStorage.setItem('Users', JSON.stringify(users));
    }
}
