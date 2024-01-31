import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CoursePageDTO} from "../../../interfaces/course-page.dto";
import {CoursesService} from "../../../services/courses.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AccountDTO} from "../../../interfaces/account.dto";
import {NzListModule} from "ng-zorro-antd/list";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-student-course-page',
  standalone: true,
  imports: [
    NzListModule,
    RouterLink,
    NzDescriptionsModule,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './student-course-page.component.html',
  styleUrl: './student-course-page.component.scss'
})
export class StudentCoursePageComponent implements OnInit {
  course$!: Observable<CoursePageDTO>;

  constructor(
    private courseService: CoursesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id: number = params['id'];
      if (!id) {
        throw new Error('id не найден');
      }
      this.course$ = this.courseService.getById(id);
    });
  }

  getFullName(account: AccountDTO) {
    return `${account.lastname} ${account.name} ${account.patronymic}`;
  }
}
