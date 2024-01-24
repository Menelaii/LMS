import {Component, OnInit} from '@angular/core';
import {CachedSrcDirective} from "../../directives/cachedSrc.directive";
import {JsonPipe, NgIf} from "@angular/common";
import 'scorm-again';
import {StudentDTO} from "../../interfaces/student.dto";
import {ActivatedRoute} from "@angular/router";
import {LessonPageDTO} from "../../interfaces/lesson-page.dto";
import {LessonService} from "../../services/lesson.service";
import {HttpClientModule} from "@angular/common/http";
import {UrlChangerService} from "../../services/url-changer.service";
import {LessonProgressService} from "../../services/lesson-progress.service";

declare var Scorm12API: any;

declare global {
  interface Window {
    API: any;
  }
}

@Component({
  selector: 'app-course-page',
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
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent implements OnInit {
  apiConfig = {};
  log = '';
  isLoaded = false;
  driverUrl = "/scormdriver/indexAPI.html";

  id: number;
  url!: string;
  student!: StudentDTO;

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
        window.API.cmi.core.student_name = 'test-name'; //todo this.student.firstname;
      } else {
        this.loadProgress(lessonPage.progress);
      }
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
    // window.API.loadFromJSON(JSON.parse(jsonData));
    window.API.loadFromJSON(jsonData);
  }

  updateLog() {
    this.log = window.API.cmi.toJSON();
  }

  saveProgress() {
    this.lessonProgressService.saveProgress(this.id, window.API.cmi.toJSON()).subscribe(() =>{
      console.log('progress saved');
    });
  }
}
