import { Component } from '@angular/core';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [
    NzContentComponent,
    NzHeaderComponent,
    NzIconDirective,
    NzLayoutComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzSiderComponent,
    NzSubMenuComponent,
    RouterOutlet,
    RouterLink,
    NzBreadCrumbModule,
    NgIf
  ],
  templateUrl: './teacher-layout.component.html',
  styleUrl: './teacher-layout.component.scss'
})
export class TeacherLayoutComponent {
  isCollapsed = true;
  showHeader = false;

  constructor(private authService: AuthService) {
  }

  onLogoutClick() {
    this.authService.signOut();
  }
}
