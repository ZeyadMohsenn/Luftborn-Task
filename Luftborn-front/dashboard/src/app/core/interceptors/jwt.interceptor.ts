import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { switchMap, catchError } from 'rxjs';
import { throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.user();
  const token = user?.accessToken;
  // console.log('Token:', token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': 'en',
      },
    });
  }

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        console.log('Unauthorized - Logging out...');

        auth.logout();

        router.navigate(['/login']);

        return throwError('User logged out');
      }

      return throwError(error);
    })
  );
};
