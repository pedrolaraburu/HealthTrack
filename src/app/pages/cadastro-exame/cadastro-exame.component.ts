import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { faUserCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cadastro-exame',
  templateUrl: './cadastro-exame.component.html',
  styleUrls: ['./cadastro-exame.component.scss']
})
export class CadastroExameComponent implements OnInit {
  loggedinUser: any = {};
  faUser = faUserCircle;
  faMagnifyingGlass = faMagnifyingGlass;
  searchText: any;
  pacients: any = {};
  filterPacients: any = {};
  lengthArray: any;
  constructor(private _usersService: UserService) {}

  ngOnInit(): void {
      this.loggedIn();
      this.getPacientsData();
      this.doFilterPacients();
  }

  loggedIn() {
      this.loggedinUser = JSON.parse(localStorage.getItem("token") as string);
      return this.loggedinUser;
  }

  getPacientsData() {
      this.pacients = JSON.parse(localStorage.getItem("Pacients") as string);
      return this.pacients;
  }

  doFilterPacients() {
      this.filterPacients = this.pacients.filter((e: any) => {
          return e.ids.medicID === this.loggedinUser.id;
          // console.log(e.ids.medicID, this.loggedinUser.id);
      });
      this.lengthArray = Object.keys(this.filterPacients).length;
      // console.log(this.filterPacients);
      // console.log(this.lengthArray);
      return this.lengthArray, this.filterPacients;
  }

  handleInput(){
    // let args = this.filterPacients;
    // return this.searchText.filter((item: any) => {
    //   return JSON.stringify(item).toLowerCase().includes(args);
    // })
  }
}
