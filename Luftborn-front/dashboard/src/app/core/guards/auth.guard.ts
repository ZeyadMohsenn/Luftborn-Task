// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../../auth/services/auth.service';

// export const authGuard: CanActivateFn = _ => {
//   const auth = inject(AuthService);
//   const router = inject(Router);
//   const user = auth.user();

//   if (!user || user.accessToken === null) {
//     router.navigate(['/login']);
//     return false;
//   }

//   return true;
// };
