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

    updateAppointment(userA: any) {
        let appointmentsPacients = [];
        if (localStorage.getItem("Appointments")) {
            appointmentsPacients = JSON.parse(
                localStorage.getItem("Appointments") as string
            );
            let index = appointmentsPacients.findIndex(
                (obj: any) => obj.ids.appointmentID === userA.ids.appointmentID
            );
            appointmentsPacients[index] = userA;
        }
        localStorage.setItem(
            "Appointments",
            JSON.stringify(appointmentsPacients)
        );
    }

    updatePacient(userP: any) {
        let pacients = [];
        if (localStorage.getItem("Pacients")) {
            pacients = JSON.parse(localStorage.getItem("Pacients") as string);
            let index = pacients.findIndex(
                (obj: any) => obj.ids.pacientID == userP.ids.pacientID
            );
            pacients[index] = userP;
        }
        localStorage.setItem(
            "Pacients",
            JSON.stringify(pacients)
        );
    }

    updateExams(userE: any) {
        let examsPacients = [];
        if (localStorage.getItem("Exams")) {
            examsPacients = JSON.parse(localStorage.getItem("Exams") as string);
            let index = examsPacients.findIndex(
                (obj: any) => obj.ids.examID === userE.ids.examID
            );
            examsPacients[index] = userE;
        }
        localStorage.setItem("Exams", JSON.stringify(examsPacients));
    }

    deleteAppointment(userA: any) {
        let appointmentsPacients = [];
        if (localStorage.getItem("Appointments")) {
            appointmentsPacients = JSON.parse(
                localStorage.getItem("Appointments") as string
            );
            let index = appointmentsPacients.findIndex(
                (obj: any) => obj.ids.appointmentID === userA.ids.appointmentID
            );
            appointmentsPacients.splice(index, 1);
        }
        localStorage.setItem(
            "Appointments",
            JSON.stringify(appointmentsPacients)
        );
    }

    deleteExam(userE: any) {
        let examsPacients = [];
        if (localStorage.getItem("Exams")) {
            examsPacients = JSON.parse(localStorage.getItem("Exams") as string);
            let index = examsPacients.findIndex(
                (obj: any) => obj.ids.examID === userE.ids.examID
            );
            examsPacients.splice(index, 1);
        }
        localStorage.setItem("Exams", JSON.stringify(examsPacients));
    }

    deletePacient(userP: any) {
        let pacients = [];
        if (localStorage.getItem("Pacients")) {
            pacients = JSON.parse(localStorage.getItem("Pacients") as string);
            let index = pacients.findIndex(
                (obj: any) => obj.ids.pacientID == userP.ids.pacientID
            );
            pacients.splice(index, 1);
        }
        console.log(pacients);
        localStorage.setItem(
            "Pacients",
            JSON.stringify(pacients)
        );
    }
}
