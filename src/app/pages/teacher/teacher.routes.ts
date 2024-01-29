import {Routes} from "@angular/router";
import {RoleGuard} from "../../services/guards/role.guard";
import {environment} from "../../../environments/environment.dev";
import {TeacherLayoutComponent} from "./teacher-layout/teacher-layout.component";
import {TeacherHomePageComponent} from "./teacher-home-page/teacher-home-page.component";
import {EnrollmentFormComponent} from "./enrollment-form/enrollment-form.component";
import {CreateCourseFormComponent} from "./create-course-form/create-course-form.component";
import {OwnedCoursesComponent} from "./owned-courses/owned-courses.component";
import {CreateLessonFormComponent} from "./create-lesson-form/create-lesson-form.component";
import {LessonPageComponent} from "../student/lesson-page/lesson-page.component";

export const teacherRoutes: Routes = [
  {
    path: '', component: TeacherLayoutComponent,
    canActivate: [RoleGuard],
    canActivateChild: [RoleGuard],
    data: {roles: [environment.ROLE_TEACHER]}, children: [
      {path: '', redirectTo: '/teacher/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: TeacherHomePageComponent},
      {path: 'enrollments/new', component: EnrollmentFormComponent},
      {path: 'courses/new', component: CreateCourseFormComponent},
      {path: 'courses/my', component: OwnedCoursesComponent},
      {path: 'lessons/new', component: CreateLessonFormComponent},
      {path: 'lessons/:id', component: LessonPageComponent},
      //todo
    ]
  },
];
