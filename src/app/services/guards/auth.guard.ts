import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {inject} from "@angular/core";

export const authGuardFn = (): Promise<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
