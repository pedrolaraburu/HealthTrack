import { Component, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FormGroupDirective } from "@angular/forms";
@Component({
    selector: "app-convenio-info",
    templateUrl: "./convenio-info.component.html",
    styleUrls: ["./convenio-info.component.scss"],
})
export class ConvenioInfoComponent {
    form: FormGroup;
    @Input() inputFormGroupName: string;
    constructor(private rootFormGroup: FormGroupDirective) {}

    ngOnInit(): void {
        this.form = this.rootFormGroup.control.get(this.inputFormGroupName) as FormGroup;
    }
}
