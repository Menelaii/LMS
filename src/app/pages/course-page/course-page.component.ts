import {Component, OnInit} from '@angular/core';
import {CachedSrcDirective} from "../../directives/cachedSrc.directive";
import {JsonPipe} from "@angular/common";
import 'scorm-again';
import {StudentDTO} from "../../interfaces/student.dto";
import {ActivatedRoute} from "@angular/router";
import {LessonPageDTO} from "../../interfaces/lesson-page.dto";
import {LessonService} from "../../services/lesson.service";

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
  apiConfig = {};
  log = '';
  isLoaded = false;

  id: number;
  progress!: boolean | number;
  url!: string;
  student!: StudentDTO;

  constructor(private lessonService: LessonService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.lessonService.getLessonPage(this.id).subscribe((lesson: LessonPageDTO) => {
      this.url = lesson.lesson.filesRootUrl;
      this.student = lesson.student;
      this.progress = lesson.student.progress;
    });

    this.registerScormApi(this.apiConfig);

    if (!this.student.progress) {
      window.API.cmi.core.student_id = this.student.id;
      window.API.cmi.core.student_name = this.student.name;
    } else {
      this.loadProgress(this.student.progress);
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
