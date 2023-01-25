import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormGroupDirective } from "@angular/forms";
import { Input } from "@angular/core";
@Component({
    selector: "app-extra-info",
    templateUrl: "./extra-info.component.html",
    styleUrls: ["./extra-info.component.scss"],
})
export class ExtraInfoComponent {
    form: FormGroup;
    @Input() inputFormGroupName: string;
    constructor(private rootFormGroup: FormGroupDirective) {}

    ngOnInit(): void {
        this.form = this.rootFormGroup.control.get(this.inputFormGroupName) as FormGroup;
    }
}
