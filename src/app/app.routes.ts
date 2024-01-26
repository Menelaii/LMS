import { Routes } from '@angular/router';
import {LessonPageComponent} from "./pages/student/lesson-page/lesson-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {StudentHomePageComponent} from "./pages/student/student-home-page/student-home-page.component";
import {roleAuthGuard} from "./services/guards/role-auth.guard";
import {environment} from "../environments/environment.dev";
import {TeacherHomePageComponent} from "./pages/teacher/teacher-home-page/teacher-home-page.component";

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent},

  {
    path: '', component: StudentHomePageComponent,
    canActivate: [roleAuthGuard(environment.ROLE_STUDENT)],
    canActivateChild: [roleAuthGuard(environment.ROLE_STUDENT)], children: [
      {path: 'lessons/:id', component: LessonPageComponent},
    ]
  },


  {
    path: 'teacher', component: TeacherHomePageComponent,
    canActivate: [roleAuthGuard(environment.ROLE_TEACHER)],
    canActivateChild: [roleAuthGuard(environment.ROLE_TEACHER)], children: [
      // {path: 'lessons/:id', component: LessonPageComponent},
    ]
  }
];
