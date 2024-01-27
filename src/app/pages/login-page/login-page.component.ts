import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router, RouterLink} from "@angular/router";
import {AuthRequestDTO} from "../../interfaces/auth-request.dto";
import {Observer} from "rxjs";
import {AuthResponseDTO} from "../../interfaces/auth-response.dto";
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../../environments/environment.dev";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    HttpClientModule,
    RouterLink,
    NzFormModule,
    NzInputGroupComponent,
    NzInputDirective,
    NzCheckboxComponent,
    NzButtonComponent,
    NzLayoutComponent,
    NzContentComponent,
    NzBreadCrumbItemComponent,
    NzFooterComponent,
    NzBreadCrumbComponent,
    NzHeaderComponent,
    NzMenuDirective,
    NzMenuItemComponent
  ],
  providers: [
    AuthService,
    TokenStorageService,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  form: FormGroup;
  isSubmitted = false;
  error = false;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router)
  {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  onSubmit() {
    if (this.isSubmitted || this.form.invalid) {
      return;
    }

    this.isSubmitted = true;

    const formData: AuthRequestDTO = {...this.form.value}

    const observer: Observer<AuthResponseDTO | null> = {
      complete: () =>  {
      },

      error: (err: any) => {
        this.error = true;
        this.isSubmitted = false;
      },

      next: (value: AuthResponseDTO | null) => {
        if (value) {
          this.tokenStorage.setToken(value);
          switch (this.authService.getRole()) {
            case environment.ROLE_TEACHER:
              this.router.navigate(['/teacher']);
              break;
            case environment.ROLE_STUDENT:
              this.router.navigate(['/']);
              break;
            default:
              //todo
              break;
          }

          this.isSubmitted = false;
          this.error = false;
        }
      }
    }

    this.authService.signIn(formData).subscribe(observer);
  }
}
