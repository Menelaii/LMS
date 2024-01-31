import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CourseShortDTO} from "../../../interfaces/course-short.dto";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {CoursesService} from "../../../services/courses.service";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {NzListModule} from "ng-zorro-antd/list";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {Pagination} from "../../../interfaces/pagination";
import {PaginationService} from "../../../services/pagination.service";

@Component({
  selector: 'app-owned-courses',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    NgIf,
    AsyncPipe,
    NzListModule,
    RouterLink,
    NzPaginationModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './owned-courses.component.html',
  styleUrl: './owned-courses.component.scss'
})
export class OwnedCoursesComponent {
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
    this.courses$ = this.courseService.getOwnedCourses();
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
