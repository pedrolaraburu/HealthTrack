import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showModal: boolean = false;
  email: string = '';
  password: string = '';

  captura() {
    console.log(this.email, this.password);
  }

  mostra() {
    this.showModal = true;
  }
}
