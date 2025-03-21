import { Routes } from '@angular/router';
// import { isSignInGuard } from './core/guards/is-sign-in.guard';
import { MessageService } from 'primeng/api';
import { AppLayoutComponent } from './layout/app.layout.component';

export const routes: Routes = [
//   {
//     path: 'login',
//     loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent),
//     canActivate: [isSignInGuard],
//     providers: [MessageService],
//   },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/dashboard/main/main.routes').then(m => m.MainRoutes),
      },
      // {
      //   path: 'clients',
      //   loadChildren: () =>
      //     import('./modules/dashboard/clients/clients.routes').then(
      //       (m) => m.ClientsRoutes
      //     ),
      // },
      // {
      //   path: 'users',
      //   loadChildren: () =>
      //     import('./modules/dashboard/users/users.routes').then(
      //       (m) => m.UsersRoutes
      //     ),
      // },
    ],
  },
];
