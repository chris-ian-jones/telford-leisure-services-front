import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((module) => module.HomeModule)
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./auth/sign-up/sign-up.component').then((c) => c.SignUpComponent),
  },
  {
    path: 'sign-up/success',
    loadComponent: () =>
      import('./auth/sign-up/success/success.component').then(
        (c) => c.SuccessComponent
      )
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./auth/sign-in/sign-in.component').then((c) => c.SignInComponent)
  },
  {
    path: 'feedback',
    loadComponent: () =>
      import('./feedback/feedback.component').then((c) => c.FeedbackComponent),
  },
  {
    path: 'feedback/success',
    loadComponent: () =>
      import('./feedback/success/success.component').then(
        (c) => c.SuccessComponent
      )
  },
  {
    path: 'account-recovery',
    loadComponent: () =>
      import('./auth/account-recovery/account-recovery.component').then(
        (c) => c.AccountRecoveryComponent
      )
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canActivate: [AuthenticatedGuard]
  }
];
