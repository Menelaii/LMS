import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TeacherLessonPageDTO} from "../../../interfaces/teacher-lesson-page.dto";
import {LessonService} from "../../../services/lesson.service";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzListModule} from "ng-zorro-antd/list";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {NzTableModule, NzThAddOnComponent} from "ng-zorro-antd/table";
import {NzTypographyModule} from "ng-zorro-antd/typography";

@Component({
  selector: 'app-teacher-lesson-page',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgForOf,
    NgIf,
    NzTableModule,
    NzDescriptionsModule,
    NzListModule,
    NzThAddOnComponent,
    NgStyle,
    NzTypographyModule
  ],
  templateUrl: './teacher-lesson-page.component.html',
  styleUrl: './teacher-lesson-page.component.scss'
})
export class TeacherLessonPageComponent implements OnInit {
  lessonPage$!: Observable<TeacherLessonPageDTO>;

  constructor(
    private lessonService: LessonService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //todo проверить нет ли многократных подписок
    this.activatedRoute.params.subscribe(params => {
      const id: number = params['lessonId'];
      this.lessonPage$ = this.lessonService.getTeacherLessonPageById(id);
    });
  }
}
