import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const isLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
  if (sessionStorage.getItem('token') != null) {
    return true;
  } else {
    return false;
  }
} else {
  console.log('Not running in the browser.');
  return false;
}
};
