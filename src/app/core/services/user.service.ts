import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserInterface } from "../../models/user.interface";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { registerIdInterface } from "../../models/registerIdentification-interface";
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
    }
    constructor(private http: HttpClient, private router: Router) {}

    addUser(user: UserInterface) {
        let users = [];
        if (localStorage.getItem("Users")) {
            users = JSON.parse(localStorage.getItem("Users") as string);
            users = [...users, user];
        } else {
            users = [user];
        }
        localStorage.setItem("Users", JSON.stringify(users));
    }

    addPacient(userR: registerIdInterface) {
        console.log(userR);
        let pacients = [];
        if (localStorage.getItem("Pacients")) {
            pacients = JSON.parse(localStorage.getItem("Pacients") as string);
            pacients = [...pacients, userR];
        } else {
            pacients = [userR];
        }
        localStorage.setItem("Pacients", JSON.stringify(pacients));
    }

    addExam(userE: any) {
        console.log(userE);
        let examPacients = [];
        if (localStorage.getItem("Exams")) {
            examPacients = JSON.parse(localStorage.getItem("Exams") as string);
            examPacients = [...examPacients, userE];
        } else {
            examPacients = [userE];
        }
        localStorage.setItem("Exams", JSON.stringify(examPacients));
    }

    addAppointment(userA: any) {
        console.log(userA);
        let appointmentsPacients = [];
        if (localStorage.getItem("Appointments")) {
            appointmentsPacients = JSON.parse(
                localStorage.getItem("Appointments") as string
            );
            appointmentsPacients = [...appointmentsPacients, userA];
        } else {
            appointmentsPacients = [userA];
        }
        localStorage.setItem(
            "Appointments",
            JSON.stringify(appointmentsPacients)
        );
    }
}
