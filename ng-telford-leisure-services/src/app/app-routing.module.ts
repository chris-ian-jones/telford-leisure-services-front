import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./auth/sign-up/sign-up.module').then(module => module.SignUpModule),
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/sign-in/sign-in.module').then(module => module.SignInModule),
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then(module => module.FeedbackModule),
  },
  {
    path: 'account-recovery',
    loadChildren: () => import('./auth/account-recovery/account-recovery.module').then(module => module.AccountRecoveryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
