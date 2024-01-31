import { Component } from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from "ng-zorro-antd/descriptions";
import {Observable} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {TeacherDTO} from "../../../interfaces/teacher.dto";

@Component({
  selector: 'app-teacher-home-page',
  standalone: true,
    imports: [
        AsyncPipe,
        NgIf,
        NzDescriptionsComponent,
        NzDescriptionsItemComponent
    ],
  templateUrl: './teacher-home-page.component.html',
  styleUrl: './teacher-home-page.component.scss'
})
export class TeacherHomePageComponent {
  userDetails$: Observable<TeacherDTO>;

  constructor(private authService: AuthService) {
    this.userDetails$ = authService.getAuthenticatedTeacher();
  }

  getFullName(userDetails: TeacherDTO) {
    return `${userDetails.lastname} ${userDetails.name} ${userDetails.patronymic}`;
  }
}
