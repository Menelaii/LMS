import { Component } from '@angular/core';
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
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
        RouterLink,
        RouterOutlet
    ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  isCollapsed = true;

  constructor(private authService: AuthService) {
  }

  onLogoutClick() {
    this.authService.signOut();
  }
}
