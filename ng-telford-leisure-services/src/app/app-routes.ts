import { Routes } from '@angular/router';
import { authenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./auth/sign-up/sign-up.component')
  },
  {
    path: 'sign-up/success',
    loadComponent: () => import('./auth/sign-up/success/success.component')
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./auth/sign-in/sign-in.component')
  },
  {
    path: 'feedback',
    loadComponent: () => import('./feedback/feedback.component')
  },
  {
    path: 'feedback/success',
    loadComponent: () => import('./feedback/success/success.component')
  },
  {
    path: 'account-recovery',
    loadComponent: () =>
      import('./auth/account-recovery/account-recovery.component')
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    canActivate: [authenticatedGuard]
  }
];
