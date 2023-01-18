import { Component, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { UserInterface } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  teste: boolean = true;
  @Output() registerUserEvent = new EventEmitter<UserInterface>();

  name: string = '';
  lName : string = '';
  emailUser : string = '';
  password : string = '';
  password2 : string = '';

  constructor(private _usersService: UserService){}

  // setName(userName: string): void{
  //   this.name = userName;
  // }
  // setLastName(lastName: string): void {
  //   this.lName = lastName;
  // }

  // setUserEmail(userEmail: string): void {
  //   this.emailUser = userEmail;
  // }

  // setUserPassword(userPassword: string): void {
  //   this.password = userPassword;
  // }

  addData(): UserInterface {
    // console.log("oi");
    const newUser: UserInterface = {
      id: Math.random.toString(),
      name: this.name,
      lastName: this.lName,
      email: this.emailUser,
      password: this.password
    }
    return newUser;
    // console.log("salve");
    // this.clearData();
  }
  clearData(): void {
    this.name = '';
    this.lName = '';
    this.emailUser = '';
    this.password = '';
    this.password2 = '';
  }

  onClick(){
    let randomId = Math.random().toString();
    this._usersService.emitChange({
      id: randomId,
      name: this.name,
      lastName: this.lName,
      email: this.emailUser,
      password: this.password
    });
    this.clearData();
  }
}
