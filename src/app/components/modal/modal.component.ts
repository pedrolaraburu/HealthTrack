import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  showModal : boolean = false;
  constructor(private _usersService: UserService){
    _usersService.changeEmitted$.subscribe(e => {
      if (e == true){
        this.showModal = true;
      }
    });
  }

  ngOnInit(): void {
  }
}
