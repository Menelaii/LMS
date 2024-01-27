import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {confirmPassword} from "../../../services/validators/confirm-password-validator";
import {RegistrationOptionsService} from "../../../services/registration-options.service";
import {StudentRegistrationOptionsDTO} from "../../../interfaces/student-registration-options.dto";
import {StudentRegistrationRequestDTO} from "../../../interfaces/student-registration-request.dto";
import {RegistrationService} from "../../../services/registration.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzContentComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";

@Component({
  selector: 'app-student-registration-page',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    NgIf,
    NzButtonComponent,
    NzCheckboxComponent,
    NzColDirective,
    NzContentComponent,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzLayoutComponent,
    NzRowDirective,
    RouterLink,
    NzFormLabelComponent,
  ],
  providers: [
    RegistrationOptionsService
  ],
  templateUrl: './student-registration-page.component.html',
  styleUrl: './student-registration-page.component.scss'
})
export class StudentRegistrationPageComponent implements OnInit {
  form: FormGroup;
  registrationOptions!: StudentRegistrationOptionsDTO;
  isLoading = true;
  isSubmitted = false
  error: string = ''; //todo

  constructor(
    private registrationOptionsService: RegistrationOptionsService,
    private registrationService: RegistrationService,
    private router: Router
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
        confirmPassword
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
      groupId: new FormControl(0, [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.registrationOptionsService.getStudentRegistrationOptions().subscribe(options => {
      this.registrationOptions = options;
      this.isLoading = false;
    })
  }

  onSubmit() {
    if (!this.isSubmitted || this.form.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.isLoading = true;
    const request: StudentRegistrationRequestDTO = {...this.form.value}
    this.registrationService.registerStudent(request).subscribe((response) => {
      this.router.navigate(['/']);
      this.isLoading = false;
    });
  }
}
