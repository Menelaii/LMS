import { Component } from '@angular/core';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-student-layout',
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
        RouterOutlet
    ],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss'
})
export class StudentLayoutComponent {
  isCollapsed = false;
}
