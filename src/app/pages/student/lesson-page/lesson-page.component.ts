import {Component, OnDestroy, OnInit} from '@angular/core';
import {CachedSrcDirective} from "../../../directives/cachedSrc.directive";
import {JsonPipe, NgIf} from "@angular/common";
import 'scorm-again';
import {AccountDTO} from "../../../interfaces/account.dto";
import {ActivatedRoute} from "@angular/router";
import {LessonPageDTO} from "../../../interfaces/lesson-page.dto";
import {LessonService} from "../../../services/lesson.service";
import {HttpClientModule, HttpHeaders} from "@angular/common/http";
import {UrlChangerService} from "../../../services/url-changer.service";
import {LessonProgressService} from "../../../services/lesson-progress.service";
import {SaveProgressRequestDTO} from "../../../interfaces/save-progress-request.dto";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {LayoutService} from "../../../services/layout.service";
import {TokenStorageService} from "../../../services/token-storage.service";

declare var Scorm12API: any;

declare global {
  interface Window {
    API: any;
  }
}

@Component({
  selector: 'app-lesson-page',
  standalone: true,
  imports: [
    CachedSrcDirective,
    JsonPipe,
    NgIf,
    HttpClientModule,
    NzDescriptionsModule
  ],
  providers: [
    LessonService,
    UrlChangerService,
    LessonProgressService
  ],
  templateUrl: './lesson-page.component.html',
  styleUrl: './lesson-page.component.scss'
})
export class LessonPageComponent implements OnInit, OnDestroy {
  apiConfig = {};
  log = '';
  isLoaded = false;
  driverUrl = "/scormdriver/indexAPI.html";

  id!: number;
  url!: string;
  student!: AccountDTO;
  sessionId!: number;
  lessonPage!: LessonPageDTO;
  authHeader!: HttpHeaders;

  constructor(
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private urlChanger: UrlChangerService,
    private lessonProgressService: LessonProgressService,
    private layoutService: LayoutService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.registerScormApi(this.apiConfig);
    this.subscribeOnApiEvents();

    this.route.params.subscribe(params => {
      this.id = params['lessonId'];
      if (!this.id) {
        throw new Error('id урока не найден');
      }
      this.lessonService.getLessonPage(this.id).subscribe(
        (lessonPage: LessonPageDTO) => {
        this.url = this.urlChanger.transformUrlForProxy(lessonPage.lesson.filesRootUrl + this.driverUrl);
        this.lessonPage = lessonPage;
        this.student = lessonPage.student;
        this.initialize(lessonPage.sessionId, lessonPage.progress);
        this.isLoaded = true;
      });
    });

    this.authHeader = this.tokenStorage.getAuthHeader();
    this.layoutService.setDisableContainerPadding(true);
    this.layoutService.setIsSiderCollapsed(true);
  }

  ngOnDestroy(): void {
    this.layoutService.setDisableContainerPadding(false);
    this.layoutService.setIsSiderCollapsed(false);
  }

  registerScormApi(settings: any): void {
    window.API = new Scorm12API(settings);
  }

  subscribeOnApiEvents() {
    // window.API.on("LMSInitialize", function() {
    // });

    window.API.on("LMSCommit", () => {
      this.saveProgress();
    });

    // window.API.on("LMSFinish", function() {
    // });
  }

  initialize(sessionId: number | undefined, progress: any) {
    if (!progress) {
      window.API.cmi.core.student_id = this.student.id;
      window.API.cmi.core.student_name =
        `${this.student.lastname} ${this.student.name} ${this.student.patronymic}`;
      this.sessionId = 0;
    } else {
      window.API.loadFromJSON(progress);
      this.sessionId = sessionId ?? -1;
      this.sessionId++;
    }
  }

  saveProgress() {
    const requestDTO: SaveProgressRequestDTO = {
      progress: window.API.cmi.toJSON(),
      sessionId: this.sessionId
    }

    this.lessonProgressService.saveProgress(this.id, requestDTO, this.authHeader).subscribe(() => {
      console.log('прогресс сохранён');
    });
  }
}
