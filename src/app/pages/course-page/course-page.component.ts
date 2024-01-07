import {Component, OnInit} from '@angular/core';
import {CachedSrcDirective} from "../../directives/cachedSrc.directive";
import {JsonPipe} from "@angular/common";
import {MockService} from "../../services/mock.service";
import 'scorm-again';
import {StudentDTO} from "../../interfaces/student.dto";
import {ActivatedRoute} from "@angular/router";

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
    JsonPipe
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent implements OnInit {
  apiConfig: any = {};
  log: string = '';
  progress: boolean | number;

  url;
  student: StudentDTO;

  constructor(private mockService: MockService, private route: ActivatedRoute) {
    this.url = mockService.getCourseUrl();
    this.progress = this.route.snapshot.queryParams['progress'];
    this.student = this.progress == 1 ? mockService.getUserWithProgress() : mockService.getUserFresh();
  }

  ngOnInit(): void {
    this.registerScormApi(this.apiConfig);

    if (!this.student.progress) {
      window.API.cmi.core.student_id = this.student.studentId;
      window.API.cmi.core.student_name = this.student.studentName;
    } else {
      this.loadProgress(this.mockService.getProgress());
    }

    window.API.on("LMSInitialize", function() {
      console.log('on api init');
    });
  }

  registerScormApi(settings: any): void {
    window.API = new Scorm12API(settings);
  }

  loadProgress(jsonData: any) {
    window.API.loadFromJSON(jsonData);
  }

  updateLog() {
    this.log = window.API.cmi.toJSON();
  }
}
