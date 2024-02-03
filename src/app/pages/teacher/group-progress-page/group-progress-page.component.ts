import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AccountDTO} from "../../../interfaces/account.dto";
import {GroupProgressPageDTO} from "../../../interfaces/group-progress-page.dto";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from "ng-zorro-antd/descriptions";
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import {LessonProgressService} from "../../../services/lesson-progress.service";

@Component({
  selector: 'app-group-progress-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    RouterLink
  ],
  templateUrl: './group-progress-page.component.html',
  styleUrl: './group-progress-page.component.scss'
})
export class GroupProgressPageComponent implements OnInit {
  groupProgressPage$!: Observable<GroupProgressPageDTO>;

  listOfColumn = [
    'ФИО',
    'Затраченное время',
    'Балл %',
    'Попыток',
    'Тест пройден',
    ''
  ]

  constructor(
    private lessonProgressService: LessonProgressService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //todo проверить нет ли многократных подписок
    this.activatedRoute.params.subscribe(params => {
      const groupId: number = params['groupId'];
      const lessonId: number = params['lessonId'];
      this.groupProgressPage$ = this.lessonProgressService.getGroupProgress(groupId, lessonId);
    });
  }

  getFullName(account: AccountDTO) {
    return `${account.lastname} ${account.name} ${account.patronymic}`;
  }
}
