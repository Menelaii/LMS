import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzContentComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent} from "ng-zorro-antd/select";
import {RegistrationService} from "../../../services/registration.service";
import {confirmPassword} from "../../../services/validators/confirm-password-validator";
import {TeacherRegistrationRequestDTO} from "../../../interfaces/teacher-registration-request.dto";
import {NzNotificationService, NzNotificationServiceModule} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-register-teacher-form',
  standalone: true,
    imports: [
      FormsModule,
      NgForOf,
      NgIf,
      NzButtonComponent,
      NzColDirective,
      NzContentComponent,
      NzFormControlComponent,
      NzFormDirective,
      NzFormItemComponent,
      NzFormLabelComponent,
      NzInputDirective,
      NzLayoutComponent,
      NzOptionComponent,
      NzRowDirective,
      ReactiveFormsModule,
      NzNotificationServiceModule,
    ],
  templateUrl: './register-teacher-form.component.html',
  styleUrl: './register-teacher-form.component.scss'
})
export class RegisterTeacherFormComponent {
  form: FormGroup;
  isLoading = true;
  isSubmitted = false

  constructor(
    private registrationService: RegistrationService,
    private notification: NzNotificationService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      patronymic: new FormControl('', [
        Validators.required
      ]),
    }, {validators: confirmPassword});
  }

  onSubmit() {
    if (this.isSubmitted || this.form.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.isLoading = true;
    const request: TeacherRegistrationRequestDTO = {...this.form.value}
    this.registrationService.registerTeacher(request).subscribe((response) => {
      this.isSubmitted = false;
      this.isLoading = false;
      this.createNotification();
    });
  }

  createNotification() {
    this.notification.success('Учитель добавлен', '', {
      nzDuration: 1500
    });
  }
}
