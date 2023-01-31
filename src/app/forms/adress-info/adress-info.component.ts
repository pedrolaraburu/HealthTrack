import { Component, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { CepService } from 'src/app/core/services/cep.service';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-address-info',
  templateUrl: './adress-info.component.html',
  styleUrls: ['./adress-info.component.scss']
})
export class AddressInfoComponent implements OnInit {
  form: FormGroup;
  @Input() inputFormGroupName: string;
  cep: any = [];
  constructor(private rootFormGroup: FormGroupDirective, private cepService: CepService, private _usersService: UserService){}

  ngOnInit(): void {
      this.form = this.rootFormGroup.control.get(this.inputFormGroupName) as FormGroup;
  }

  getCepByCode(cep: any): void{
    console.log('teste');
    this.cepService.buscaCEP(cep).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.cep = Object.keys(res).map((key: any) => res[key])
      },
      error: (err) => console.error('Something is wrong', err),
    });
    console.log(this.cep);
    this._usersService.emitChange(this.cep);
  }

  





}
