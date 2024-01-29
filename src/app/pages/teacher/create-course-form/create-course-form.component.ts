import { Component } from '@angular/core';
import {CoursesService} from "../../../services/courses.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CourseUploadDTO} from "../../../interfaces/course-upload.dto";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";

@Component({
  selector: 'app-create-course-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    ReactiveFormsModule,
    NzInputDirective,
    NzInputGroupComponent
  ],
  templateUrl: './create-course-form.component.html',
  styleUrl: './create-course-form.component.scss'
})
export class CreateCourseFormComponent {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private courseService: CoursesService
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    if (this.isSubmitted || this.form.invalid) {
      return;
    }

    this.isSubmitted = true;
    const data: CourseUploadDTO = {...this.form.value}

    this.courseService.upload(data).subscribe(r => {
      this.isSubmitted = false;
    });
  }
}
