import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {CoursePageDTO} from "../../../interfaces/course-page.dto";
import {CoursesService} from "../../../services/courses.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {
  NzListModule
} from "ng-zorro-antd/list";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {AccountDTO} from "../../../interfaces/account.dto";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {Pagination} from "../../../interfaces/pagination";
import {PaginationService} from "../../../services/pagination.service";

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgStyle,
    RouterLink,
    NgForOf,
    NzDescriptionsModule,
    NzListModule,
    NzPaginationComponent,
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent implements OnInit {
  private currentPage$ = new BehaviorSubject<number>(1);

  course$!: Observable<CoursePageDTO>;
  coursePageWithPaginatedLessons$!: Observable<CoursePageDTO>;

  pagination: Pagination = {
    page: 1,
    pageSize: 10,
    totalItems: 0,
  }

  constructor(
    private courseService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id: number = params['id'];
      if (!id) {
        throw new Error('id не найден');
      }
      this.course$ = this.courseService.getById(id);
      this.coursePageWithPaginatedLessons$ = combineLatest([this.course$, this.currentPage$]).pipe(
        map(([coursePage, page]) => {
          this.pagination.page = page;
          this.pagination.totalItems = coursePage.course.lessons.length;

          const paginatedItems = this.paginationService.getPaginatedItems(
            coursePage.course.lessons,
            this.pagination
          );

          const courseShallowCopy = Object.assign({}, coursePage.course);
          courseShallowCopy.lessons = paginatedItems;

          return {
            course: courseShallowCopy,
            owner: coursePage.owner
          }
        })
      );
    });
  }

  getFullName(account: AccountDTO) {
    return `${account.lastname} ${account.name} ${account.patronymic}`;
  }

  onPageChange(page: number) {
    this.currentPage$.next(page);
  }
}
