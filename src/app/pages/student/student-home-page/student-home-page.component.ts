import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {StudentDTO} from "../../../interfaces/student.dto";
import {AuthService} from "../../../services/auth.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {TeacherDTO} from "../../../interfaces/teacher.dto";

@Component({
  selector: 'app-student-home-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NzDescriptionsModule
  ],
  providers: [
  ],
  templateUrl: './student-home-page.component.html',
  styleUrl: './student-home-page.component.scss'
})
export class StudentHomePageComponent {
  userDetails$: Observable<StudentDTO>;

  constructor(private authService: AuthService) {
    this.userDetails$ = authService.getAuthenticatedStudent();
  }

  getFullName(userDetails: StudentDTO) {
    return `${userDetails.lastname} ${userDetails.name} ${userDetails.patronymic}`;
  }
}
