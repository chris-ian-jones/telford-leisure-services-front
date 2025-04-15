import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((module) => module.HomeModule)
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./auth/sign-up/sign-up.module').then(
        (module) => module.SignUpModule
      )
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./auth/sign-in/sign-in.component').then((c) => c.SignInComponent)
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./feedback/feedback.module').then(
        (module) => module.FeedbackModule
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
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      )
  }
];
