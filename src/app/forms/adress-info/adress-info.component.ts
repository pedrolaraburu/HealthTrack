import { Component, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
@Component({
  selector: 'app-adress-info',
  templateUrl: './adress-info.component.html',
  styleUrls: ['./adress-info.component.scss']
})
export class AdressInfoComponent implements OnInit {
  form: FormGroup;
  @Input() inputFormGroupName: string;
  constructor(private rootFormGroup: FormGroupDirective){}

  ngOnInit(): void {
      this.form = this.rootFormGroup.control.get(this.inputFormGroupName) as FormGroup;
  }
}
