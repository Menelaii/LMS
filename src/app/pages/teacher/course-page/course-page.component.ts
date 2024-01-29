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
  NzListItemActionsComponent, NzListItemComponent
} from "ng-zorro-antd/list";
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from "ng-zorro-antd/descriptions";
import {AccountDTO} from "../../../interfaces/account.dto";

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgStyle,
    NzListHeaderComponent,
    NzListItemActionComponent,
    RouterLink,
    NzListComponent,
    NzListItemActionsComponent,
    NzListItemComponent,
    NgForOf,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent implements OnInit {
  id: number | undefined;
  course$!: Observable<CoursePageDTO>;

  constructor(
    private courseService: CoursesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (!this.id) {
      throw new Error('id не найден');
    }

    this.course$ = this.courseService.getById(this.id);
  }

  getFullName(account: AccountDTO) {
    return `${account.lastname} ${account.name} ${account.patronymic}`;
  }
}
