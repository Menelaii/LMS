import {Component} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {CoursesService} from "../../../services/courses.service";
import {Observable} from "rxjs";
import {CourseShortDTO} from "../../../interfaces/course-short.dto";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {
  NzListComponent,
  NzListHeaderComponent,
  NzListItemActionComponent,
  NzListItemActionsComponent, NzListItemComponent
} from "ng-zorro-antd/list";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-my-courses-page',
  standalone: true,
  imports: [
    HttpClientModule,
    NgIf,
    AsyncPipe,
    NgForOf,
    NzListComponent,
    NzListHeaderComponent,
    NzListItemActionComponent,
    NzListItemActionsComponent,
    NzListItemComponent,
    RouterLink,
    NgStyle,
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
