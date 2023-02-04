import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-modal-re',
  templateUrl: './modal-re.component.html',
  styleUrls: ['./modal-re.component.scss']
})
export class ModalREComponent implements OnInit {
  showModal : boolean = false;
  constructor(private _usersService: UserService) {
    _usersService.changeEmitted$.subscribe(e => {
      if (e == true){
        this.showModal = true;
      }
    });
  }
  ngOnInit(): void {
  }
}
