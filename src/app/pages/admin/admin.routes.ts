import {Routes} from "@angular/router";
import {RoleGuard} from "../../services/guards/role.guard";
import {environment} from "../../../environments/environment.dev";
import {RegisterTeacherFormComponent} from "./register-teacher-form/register-teacher-form.component";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {AdminHomePageComponent} from "./admin-home-page/admin-home-page.component";

export const adminRoutes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    canActivate: [RoleGuard],
    canActivateChild: [RoleGuard],
    data: {roles: [environment.ROLE_ADMIN]}, children: [
      {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: AdminHomePageComponent},
      {path: 'teachers/new', component: RegisterTeacherFormComponent},
    ]
  }
]
