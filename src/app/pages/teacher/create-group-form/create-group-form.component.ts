import { Component } from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreateGroupRequestDTO} from "../../../interfaces/create-group-request.dto";
import {Observable} from "rxjs";
import {GroupUploadOptionsDTO} from "../../../interfaces/group-upload-options.dto";
import {GroupService} from "../../../services/group.service";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";

@Component({
  selector: 'app-create-group-form',
  standalone: true,
  imports: [
    NgIf,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf,
    NzOptionComponent,
    NzSelectComponent
  ],
  templateUrl: './create-group-form.component.html',
  styleUrl: './create-group-form.component.scss'
})
export class CreateGroupFormComponent {
  form: FormGroup;
  isSubmitted = false;
  options$: Observable<GroupUploadOptionsDTO>;

  constructor(
    private groupService: GroupService
  ) {
    this.options$ = groupService.getUploadOptions();

    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
      streamId: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  onSubmit() {
    if (this.isSubmitted || this.form.invalid) {
      return;
    }

    this.isSubmitted = true;
    const data: CreateGroupRequestDTO = {...this.form.value}
    this.groupService.create(data).subscribe(r => {
      this.isSubmitted = false;
    });
  }
}
