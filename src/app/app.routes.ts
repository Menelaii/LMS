import { Routes } from '@angular/router';
import {
  StudentRegistrationPageComponent
} from "./pages/student/student-registration-page/student-registration-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },

  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: StudentRegistrationPageComponent},

  { path: 'student', loadChildren: () => import('./pages/student/student.routes').then(m => m.studentRoutes) },
  { path: 'teacher', loadChildren: () => import('./pages/teacher/teacher.routes').then(m => m.teacherRoutes) }
];
