import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Input } from '@angular/core';
@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  form: FormGroup;
  @Input() inputFormGroupName: string;
  constructor(private rootFormGroup: FormGroupDirective){}

  ngOnInit(): void {
      this.form = this.rootFormGroup.control.get(this.inputFormGroupName) as FormGroup;
  }
}
