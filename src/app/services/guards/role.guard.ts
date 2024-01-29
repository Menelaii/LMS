import {inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {ActivatedRouteSnapshot, CanActivateFn, Router} from "@angular/router";
import {Observable} from "rxjs";

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot)
  : Observable<boolean> | Promise<boolean> | boolean => {

  let roles = route.data['roles'] as Array<string>;
  while (!roles && route.parent) {
    route = route.parent;
    roles = route.data['roles'];
  }
  roles = roles || [];

  const canActivate = roles.includes(inject(AuthService).getRole());
  if (!canActivate) {
    inject(Router).navigate(['/login']);
  }

  return canActivate;
}
