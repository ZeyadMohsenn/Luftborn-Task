import { Routes } from '@angular/router';
// import { authGuard } from '../../../core/guards/auth.guard';


export const UsersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./users.component').then(u =>u.UsersComponent ),
   
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-user/add-user.component').then(e => e.AddUserComponent),
  
    data: {
      breadcrumb: 'edit supplier',
    },
    
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-user/add-user.component').then(m => m.AddUserComponent),
    data: {
      breadcrumb: 'add supplier',
    },
  },
  
];

