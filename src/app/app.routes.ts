import { Routes } from '@angular/router';
import {LessonPageComponent} from "./pages/student/lesson-page/lesson-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {authGuardFn} from "./services/guards/auth.guard";
import {StudentHomePageComponent} from "./pages/student/student-home-page/student-home-page.component";
import {roleAuthGuard} from "./services/guards/role-auth.guard";

export const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'home', component: StudentHomePageComponent, canActivate: [authGuardFn]},
  {path: 'lessons/:id', component: LessonPageComponent, canActivate: [authGuardFn]}
];
