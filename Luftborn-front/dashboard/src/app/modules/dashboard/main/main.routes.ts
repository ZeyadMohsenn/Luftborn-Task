import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
// import { authGuard } from '../../../core/guards/auth.guard';

export const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('../../features/users/users.routes').then(m => m.UsersRoutes),
        data: {
          breadcrumb: 'suppliers',
        },
      },
  
    ],
  },
];
