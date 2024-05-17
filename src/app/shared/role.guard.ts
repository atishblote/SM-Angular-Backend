import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const jsonString = sessionStorage.getItem('userData');
    if (jsonString) {
      const userData = JSON.parse(jsonString);
      console.log(userData.role);
      if (
        userData.role == 'superadmin' ||
        userData.role == 'manager' ||
        userData.role == 'updater' ||
        userData.role == 'viewer'
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log('No user data found in session storage.');
      return false;
    }
  } else {
    console.log('Not running in the browser.');
    return false;
  }
};
