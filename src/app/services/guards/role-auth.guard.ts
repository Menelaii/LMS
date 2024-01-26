import {inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

export const roleAuthGuard = (role: string): Promise<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticatedStudent()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
