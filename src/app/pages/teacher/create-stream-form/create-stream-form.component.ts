import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {CreateStreamRequestDTO} from "../../../interfaces/create-stream-request.dto";
import {StreamService} from "../../../services/stream.service";

@Component({
  selector: 'app-create-stream-form',
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
    ReactiveFormsModule
  ],
  templateUrl: './create-stream-form.component.html',
  styleUrl: './create-stream-form.component.scss'
})
export class CreateStreamFormComponent {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private streamService: StreamService
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    if (this.isSubmitted || this.form.invalid) {
      return;
    }

    this.isSubmitted = true;
    const data: CreateStreamRequestDTO = {...this.form.value}
    this.streamService.create(data).subscribe(r => {
      this.isSubmitted = false;
    });
  }
}
