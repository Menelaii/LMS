import {Routes} from "@angular/router";
import {RoleGuard} from "../../services/guards/role.guard";
import {environment} from "../../../environments/environment.dev";
import {TeacherLayoutComponent} from "./teacher-layout/teacher-layout.component";
import {TeacherHomePageComponent} from "./teacher-home-page/teacher-home-page.component";

export const teacherRoutes: Routes = [
  {
    path: '', component: TeacherLayoutComponent,
    canActivate: [RoleGuard],
    canActivateChild: [RoleGuard],
    data: {roles: [environment.ROLE_TEACHER]}, children: [
      {path: '', redirectTo: '/teacher/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: TeacherHomePageComponent},
      //todo
    ]
  },
];
