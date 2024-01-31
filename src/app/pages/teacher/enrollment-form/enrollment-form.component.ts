import {Component, OnInit} from '@angular/core';
import {EnrollmentService} from "../../../services/enrollment.service";
import {CoursesService} from "../../../services/courses.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Params, RouterModule} from "@angular/router";
import {CourseShortDTO} from "../../../interfaces/course-short.dto";
import {EnrollmentTargetDTO} from "../../../interfaces/enrollment-target.dto";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EnrollmentDTO} from "../../../interfaces/enrollment.dto";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    ReactiveFormsModule,
  ],
  providers: [
    EnrollmentService,
    CoursesService,
  ],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.scss'
})
export class EnrollmentFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  isLoading = true;
  courses: CourseShortDTO[] = [];
  targets: EnrollmentTargetDTO[] = [];
  accessLevel: number;
  subscription: Subscription

  constructor(
    private enrollmentService: EnrollmentService,
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.accessLevel = this.activatedRoute.snapshot.queryParams['accessLevel'];
    this.subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.accessLevel = params['accessLevel'];
      this.fetch();
    });

    this.form = new FormGroup({
      courseId: new FormControl(null, [
        Validators.required,
      ]),
      entityId: new FormControl(null, [
        Validators.required,
      ])
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.isLoading = true;
    let isCoursesLoading = true;
    let isTargetsLoading = true;

    this.coursesService.getOwnedCourses().subscribe(courses => {
      this.courses = courses;
      isCoursesLoading = false;
      this.isLoading = isCoursesLoading || isTargetsLoading;
    })

    this.enrollmentService.getEnrollmentTargets(this.accessLevel).subscribe(t =>{
      this.targets = t;
      isTargetsLoading = false;
      this.isLoading = isCoursesLoading || isTargetsLoading;
    })
  }

  onSubmit() {
    if (this.isSubmitted || this.form.invalid) {
      return;
    }

    this.isSubmitted = true;
    const data: EnrollmentDTO = {...this.form.value}

    if (this.accessLevel == 2) {
      this.enrollmentService.enrollStream(data).subscribe(r => {
        this.isSubmitted = false;
      })
    } else if (this.accessLevel == 1){
      this.enrollmentService.enrollGroup(data).subscribe(r => {
        this.isSubmitted = false;
      })
    } else {
      throw new Error('Неверный уровень доступа');
    }
  }
}
