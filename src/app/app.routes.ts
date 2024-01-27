import { Routes } from '@angular/router';
import {LessonPageComponent} from "./pages/student/lesson-page/lesson-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {StudentHomePageComponent} from "./pages/student/student-home-page/student-home-page.component";
import {RoleGuard} from "./services/guards/role.guard";
import {environment} from "../environments/environment.dev";
import {TeacherHomePageComponent} from "./pages/teacher/teacher-home-page/teacher-home-page.component";
import {MyCoursesPageComponent} from "./pages/student/my-courses-page/my-courses-page.component";
import {
  StudentRegistrationPageComponent
} from "./pages/student/student-registration-page/student-registration-page.component";

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'sing-up', component: StudentRegistrationPageComponent},

  {
    path: '', component: StudentHomePageComponent,
    canActivate: [RoleGuard],
    canActivateChild: [RoleGuard],
    data: {roles: [environment.ROLE_STUDENT]}, children: [
      {path: 'courses', component: MyCoursesPageComponent},
      {path: 'lessons/:id', component: LessonPageComponent},
    ]
  },

  {
    path: 'teacher', component: TeacherHomePageComponent,
    canActivate: [RoleGuard],
    canActivateChild: [RoleGuard],
    data: {roles: [environment.ROLE_TEACHER]}, children: [
      // {path: 'lessons/:id', component: LessonPageComponent},
    ]
  }
];
