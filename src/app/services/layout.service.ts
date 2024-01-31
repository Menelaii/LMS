import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private showHeader = new BehaviorSubject<boolean>(true);
  private disableContainerPadding = new BehaviorSubject<boolean>(false);
  private isSiderCollapsed = new BehaviorSubject<boolean>(false);

  showHeaderObservable = this.showHeader.asObservable();
  disableContainerPaddingObservable = this.disableContainerPadding.asObservable();
  isSiderCollapsedObservable = this.isSiderCollapsed.asObservable();

  constructor() { }

  setShowHeader(value: boolean) {
    this.showHeader.next(value);
  }

  setDisableContainerPadding(value: boolean) {
    this.disableContainerPadding.next(value);
  }

  setIsSiderCollapsed(value: boolean) {
    this.isSiderCollapsed.next(value);
  }
}
