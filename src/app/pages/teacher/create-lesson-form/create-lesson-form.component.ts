import {Component} from '@angular/core';
import {FileInputHandler} from "../../../services/file-input-handler";
import {LessonService} from "../../../services/lesson.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LessonUploadDTO} from "../../../interfaces/lesson-upload.dto";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {Observable} from "rxjs";
import {LessonUploadOptionsDTO} from "../../../interfaces/lesson-upload-options.dto";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-create-lesson-form',
  standalone: true,
  imports: [
    NgIf,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf,
    NzOptionComponent,
    NzSelectComponent,
    NzUploadComponent,
    NzIconDirective
  ],
  templateUrl: './create-lesson-form.component.html',
  styleUrl: './create-lesson-form.component.scss'
})
export class CreateLessonFormComponent {
  fileInputHandler: FileInputHandler;
  form: FormGroup;
  isSubmitted = false;
  options$: Observable<LessonUploadOptionsDTO>;

  constructor(
    private lessonsService: LessonService
  ) {
    this.fileInputHandler = new FileInputHandler();
    this.options$ = lessonsService.getUploadOptions();

    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      courseId: new FormControl(null, [
        Validators.required
      ]),
      archive: new FormControl(null, [
      ])
    });
  }

  onSubmit() {
    if (this.isSubmitted || this.isInvalid()) {
      return;
    }

    this.isSubmitted = true;
    const data: LessonUploadDTO = {...this.form.value}

    // @ts-ignore
    this.lessonsService.uploadLesson(data, this.fileInputHandler.selectedFile).subscribe(r => {
      this.isSubmitted = false;
    });
  }

  isInvalid() {
    return this.form.invalid || !this.fileInputHandler.isPresent();
  }
}
