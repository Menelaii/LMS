import { Routes } from '@angular/router';
import {StudentHomePageComponent} from "./student-home-page/student-home-page.component";
import {StudentLayoutComponent} from "./student-layout/student-layout.component";
import {RoleGuard} from "../../services/guards/role.guard";
import {environment} from "../../../environments/environment.dev";
import {LessonPageComponent} from "./lesson-page/lesson-page.component";
import {MyCoursesPageComponent} from "./my-courses-page/my-courses-page.component";

export const studentRoutes: Routes = [
  {
    path: '', component: StudentLayoutComponent,
    canActivate: [RoleGuard],
    canActivateChild: [RoleGuard],
    data: {roles: [environment.ROLE_STUDENT]}, children: [
      {path: '', redirectTo: '/student/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: StudentHomePageComponent},
      {path: 'courses', component: MyCoursesPageComponent},
      {path: 'lessons/:id', component: LessonPageComponent},
    ]
  },
];
