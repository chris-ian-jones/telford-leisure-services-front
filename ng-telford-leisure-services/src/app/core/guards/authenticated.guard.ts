import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authenticatedGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('sessionToken')) {
    return true;
  }

  return router.navigate(['/sign-in']);
};
