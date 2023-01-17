import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showModal: boolean = false;


  captura() {
    console.log(this.showModal);
  }

  mostra() {
    this.showModal = true;
  }
}
