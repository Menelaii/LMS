import {Component, OnInit} from '@angular/core';
import {CachedSrcDirective} from "../../../directives/cachedSrc.directive";
import {JsonPipe, NgIf} from "@angular/common";
import 'scorm-again';
import {AccountDTO} from "../../../interfaces/account.dto";
import {ActivatedRoute} from "@angular/router";
import {LessonPageDTO} from "../../../interfaces/lesson-page.dto";
import {LessonService} from "../../../services/lesson.service";
import {HttpClientModule} from "@angular/common/http";
import {UrlChangerService} from "../../../services/url-changer.service";
import {LessonProgressService} from "../../../services/lesson-progress.service";
import {SaveProgressRequestDTO} from "../../../interfaces/save-progress-request.dto";

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
    HttpClientModule
  ],
  providers: [
    LessonService,
    UrlChangerService,
    LessonProgressService
  ],
  templateUrl: './lesson-page.component.html',
  styleUrl: './lesson-page.component.scss'
})
export class LessonPageComponent implements OnInit {
  apiConfig = {};
  log = '';
  isLoaded = false;
  driverUrl = "/scormdriver/indexAPI.html";

  id: number;
  url!: string;
  student!: AccountDTO;
  sessionId!: number;

  constructor(
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private urlChanger: UrlChangerService,
    private lessonProgressService: LessonProgressService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.registerScormApi(this.apiConfig);
  }

  ngOnInit(): void {
    this.lessonService.getLessonPage(this.id).subscribe((lessonPage: LessonPageDTO) => {
      this.url = this.urlChanger.transformUrlForProxy(lessonPage.lesson.filesRootUrl + this.driverUrl);
      console.log(this.url)
      this.student = lessonPage.student;
      this.isLoaded = true;

      if (!lessonPage.progress) {
        window.API.cmi.core.student_id = this.student.id;
        //todo
        window.API.cmi.core.student_name = this.student.name;
        this.sessionId = 0;
      } else {
        this.loadProgress(lessonPage.progress);
        this.sessionId = lessonPage.sessionId ?? -1;
        this.sessionId++;
      }

      console.log('всё инициализовано')
      console.log('session id = ' + this.sessionId)
      console.log('total time = ' + window.API.cmi.core.total_time)
    });
  }

  registerScormApi(settings: any): void {
    window.API = new Scorm12API(settings);
    window.API.on("LMSInitialize", function() {
      console.log('on api init');
    });
  }

  loadProgress(jsonData: any) {
    console.log('on load json');
    window.API.loadFromJSON(jsonData);
  }

  updateLog() {
    this.log = window.API.cmi.toJSON();
  }

  saveProgress() {
    const requestDTO: SaveProgressRequestDTO = {
      progress: window.API.cmi.toJSON(),
      sessionId: this.sessionId
    }

    this.lessonProgressService.saveProgress(this.id, requestDTO).subscribe(() =>{
      console.log('progress saved');
    });
  }
}
