import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showLoginAlert: boolean = false;
  constructor(private usersService: UserService, private router: Router){}


  ngOnInit(): void {
    console.log('On init.');
  }
  showModal: boolean = false;
  email: string = '';
  password: string = '';

  captura() {
    console.log(this.email, this.password);
  }

  mostra() {
    this.showModal = true;
  }

  login(): void{
    this.usersService.getUsers().subscribe(res => {
      const user = res.find((e: any)=> {
        return e.email === this.email && e.password === this.password
      });
      if (user){
        this.showLoginAlert = false;
        this.router.navigate(['/dashboard']);
      } else {
        this.showLoginAlert = true;
      }
    })
  }

}
