import {Component} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {CoursesService} from "../../../services/courses.service";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {CourseShortDTO} from "../../../interfaces/course-short.dto";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {
  NzListComponent,
  NzListHeaderComponent,
  NzListItemActionComponent,
  NzListItemActionsComponent, NzListItemComponent
} from "ng-zorro-antd/list";
import {RouterLink} from "@angular/router";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {Pagination} from "../../../interfaces/pagination";
import {PaginationService} from "../../../services/pagination.service";

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
        NzPaginationComponent,
    ],
  providers: [
    CoursesService,
  ],
  templateUrl: './my-courses-page.component.html',
  styleUrl: './my-courses-page.component.scss'
})
export class MyCoursesPageComponent {
  private currentPage$ = new BehaviorSubject<number>(1);

  courses$: Observable<CourseShortDTO[]>;
  paginatedCourses$: Observable<CourseShortDTO[]>;

  pagination: Pagination = {
    page: 1,
    pageSize: 10,
    totalItems: 0,
  }

  constructor(
    private courseService: CoursesService,
    private paginationService: PaginationService,
  ) {
    this.courses$ = this.courseService.getAvailableCourses();
    this.paginatedCourses$ = combineLatest([this.courses$, this.currentPage$]).pipe(
      map(([courses, page]) => {
        this.pagination.page = page;
        this.pagination.totalItems = courses.length;
        return this.paginationService.getPaginatedItems(courses, this.pagination);
      })
    );
  }

  onPageChange(page: number) {
    this.currentPage$.next(page);
  }
}
