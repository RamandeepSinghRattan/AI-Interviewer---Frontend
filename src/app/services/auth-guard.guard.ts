import { CanActivateFn, Router } from '@angular/router';
import { CheckLoginService } from './check-login.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let checkLogin = inject(CheckLoginService);
  let router = inject(Router);
  let matSnackBar = inject(MatSnackBar)

  if(checkLogin.isLoggedIn()){
      return true;
  }
  else{
    router.navigate(['login']);
    matSnackBar.open('Please login to start interview session', 'Close', { duration: 2000 });
    return false;
  }
};
