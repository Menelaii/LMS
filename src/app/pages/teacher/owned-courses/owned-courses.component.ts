import {Component} from '@angular/core';
import {CourseShortDTO} from "../../../interfaces/course-short.dto";
import {Observable} from "rxjs";
import {CoursesService} from "../../../services/courses.service";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {
  NzListComponent,
  NzListFooterComponent,
  NzListHeaderComponent,
  NzListItemActionsComponent,
  NzListItemActionComponent,
  NzListItemComponent
} from "ng-zorro-antd/list";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-owned-courses',
  standalone: true,
  imports: [
    NgForOf,
    NzListHeaderComponent,
    NzListComponent,
    NgStyle,
    NzListItemActionComponent,
    NzListItemActionsComponent,
    NgIf,
    AsyncPipe,
    NzListItemComponent,
    NzListFooterComponent,
    RouterLink
  ],
  templateUrl: './owned-courses.component.html',
  styleUrl: './owned-courses.component.scss'
})
export class OwnedCoursesComponent {
  courses$: Observable<CourseShortDTO[]>;

  constructor(private courseService: CoursesService) {
    this.courses$ = courseService.getOwnedCourses();
  }
}
