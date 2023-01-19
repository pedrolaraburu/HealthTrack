import { Component, EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { UserInterface } from "src/app/models/user.interface";
import { UserService } from "src/app/services/user.service";
@Component({
    selector: "app-cadastro",
    templateUrl: "./cadastro.component.html",
    styleUrls: ["./cadastro.component.scss"],
})
export class CadastroComponent {
    teste: boolean = true;
    
    showAlert: boolean = false;
    @Output() registerUserEvent = new EventEmitter<UserInterface>();

    name: string = "";
    lName: string = "";
    emailUser: string = "";
    password: string = "";
    password2: string = "";

    constructor(private _usersService: UserService) {
    }

    addData(): UserInterface {
        const newUser: UserInterface = {
            id: Math.random.toString(),
            name: this.name,
            lastName: this.lName,
            email: this.emailUser,
            password: this.password,
        };
        return newUser;
    }
    clearData(): void {
        this.name = "";
        this.lName = "";
        this.emailUser = "";
        this.password = "";
        this.password2 = "";
    }

    checkNull(): boolean {
      if (this.name == '' && this.lName == '' && this.emailUser == '' && this.password == '' && this.password2 == ''){
        return false;
      } else {
        return true;
      }
    }

    onClick() {
      if(this.checkNull()) {
        this.showAlert = false;
        let randomId = Math.floor(Math.random() * 10000).toString();
        this._usersService.emitChange({
            id: randomId,
            name: this.name,
            lastName: this.lName,
            email: this.emailUser,
            password: this.password,
        });
        this.clearData();
      } else {
        this.showAlert = true;
      }
    }
}
