import { Routes } from '@angular/router';
import {CoursePageComponent} from "./pages/course-page/course-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";

export const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'course/:id', component: CoursePageComponent}
];
