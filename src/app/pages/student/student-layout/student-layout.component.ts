import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzLayoutModule,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent, NzMenuModule, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {NgClass, NgIf} from "@angular/common";
import {LayoutService} from "../../../services/layout.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [
    NzLayoutModule,
    RouterOutlet,
    NzMenuModule,
    RouterLink,
    NgIf,
    NgClass,
    NzIconDirective,
  ],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss'
})
export class StudentLayoutComponent implements OnDestroy, OnInit {
  private layoutSub!: Subscription;
  private layoutPaddingSub!: Subscription;
  private layoutSiderCollapseSub!: Subscription;

  isCollapsed = true;
  showHeader = true;
  disableContainerPadding = false;

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.layoutSub = this.layoutService.showHeaderObservable.subscribe(visible => {
      this.showHeader = visible;
      this.cdr.detectChanges();
    });

    this.layoutPaddingSub = this.layoutService.disableContainerPaddingObservable.subscribe(disable => {
      this.disableContainerPadding = disable;
      this.cdr.detectChanges();
    });

    this.layoutSiderCollapseSub = this.layoutService.isSiderCollapsedObservable.subscribe(value => {
      this.isCollapsed = value;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }

    if (this.layoutPaddingSub) {
      this.layoutPaddingSub.unsubscribe();
    }

    if (this.layoutSiderCollapseSub) {
      this.layoutSiderCollapseSub.unsubscribe();
    }
  }

  onLogoutClick() {
    this.authService.signOut();
  }
}
