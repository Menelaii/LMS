import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CoursePageDTO} from "../../../interfaces/course-page.dto";
import {CoursesService} from "../../../services/courses.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {
  NzListComponent,
  NzListHeaderComponent,
  NzListItemActionComponent,
  NzListItemActionsComponent, NzListItemComponent, NzListModule
} from "ng-zorro-antd/list";
import {NzDescriptionsComponent, NzDescriptionsItemComponent, NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {AccountDTO} from "../../../interfaces/account.dto";

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
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent implements OnInit {
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
