// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../../auth/services/auth.service';

// export const isSignInGuard: CanActivateFn = _ => {
//   const auth = inject(AuthService);
//   const router = inject(Router);
//   const user = auth.user();

//   if (user && user.accessToken !== null) {
//     router.navigate(['']);
//     return false;
//   }

//   return true;
// };
