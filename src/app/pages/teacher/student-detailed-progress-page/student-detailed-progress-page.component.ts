import {Component, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {StudentDetailedProgressDTO} from "../../../interfaces/student-detailed-progress.dto";
import {LessonProgressService} from "../../../services/lesson-progress.service";
import {ActivatedRoute} from "@angular/router";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {AccountDTO} from "../../../interfaces/account.dto";
import {
  NzListModule
} from "ng-zorro-antd/list";
import {NzTableModule} from "ng-zorro-antd/table";

@Component({
  selector: 'app-student-detailed-progress-page',
  standalone: true,
  imports: [
    NzDescriptionsModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    NzListModule,
    JsonPipe,
    NzTableModule,
  ],
  templateUrl: './student-detailed-progress-page.component.html',
  styleUrl: './student-detailed-progress-page.component.scss'
})
export class StudentDetailedProgressPageComponent implements OnInit {
  detailedProgressPage$!: Observable<StudentDetailedProgressDTO>;

  constructor(
    private lessonProgressService: LessonProgressService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const studentId: number = params['studentId'];
      const lessonId: number = params['lessonId'];
      this.detailedProgressPage$ = this.lessonProgressService.getStudentDetailedProgress(
        studentId,
        lessonId
      );
    });
  }

  getFullName(account: AccountDTO) {
    return `${account.lastname} ${account.name} ${account.patronymic}`;
  }

  flattenObject(obj: any, parentKey = ''): { key: string; value: any }[] {
    return Object.keys(obj).reduce((acc, key) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return acc.concat(this.flattenObject(obj[key], fullKey));
      } else {
        return acc.concat({ key: fullKey, value: obj[key] });
      }
    }, [] as { key: string; value: any }[]);
  }
}
