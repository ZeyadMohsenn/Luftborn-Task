import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AuthService } from 'app/auth/services/auth.service';
import { catchError, map, of } from 'rxjs';

export const refreshTokenResolver: ResolveFn<boolean> = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.refreshToken().pipe(
    map(() => true),
    catchError(() => {
      console.log('Failed to refresh token');
      router.navigate(['/login']);
      return of(false);
    })
  );
};
