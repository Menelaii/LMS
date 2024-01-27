import {Component} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {CoursesService} from "../../../services/courses.service";
import {Observable} from "rxjs";
import {CourseShortDTO} from "../../../interfaces/course-short.dto";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-my-courses-page',
  standalone: true,
  imports: [
    HttpClientModule,
    NgIf,
    AsyncPipe,
    NgForOf,
  ],
  providers: [
    CoursesService,
  ],
  templateUrl: './my-courses-page.component.html',
  styleUrl: './my-courses-page.component.scss'
})
export class MyCoursesPageComponent {
  courses$: Observable<CourseShortDTO[]>;

  constructor(private coursesService: CoursesService) {
    this.courses$ = this.coursesService.getAvailableCourses();
  }
}
