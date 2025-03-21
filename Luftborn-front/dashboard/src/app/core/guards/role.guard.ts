import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { PermissionString } from '../../modules/features/user/roles/models/model/permission.enum';
export const RoleGuardWrapper = (permissions: PermissionString[]) => {
  const roleGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = auth.user();
    const userPermissions = auth.permissions();
    const routePermissions = permissions;
    if (userPermissions?.some(r => routePermissions?.includes(r as PermissionString))) {
      return true;
    } else {
      return false;
    }
  };
  return roleGuard;
};
