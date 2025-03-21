import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delayWhen, finalize, tap, timer } from 'rxjs';
import { LoadingService } from '../../auth/services/loading.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const loaderDelay = timer(800).pipe(tap(() => loadingService.loadingOn())).subscribe();

  return next(req).pipe(
    finalize(() => {
      loaderDelay.unsubscribe()
      loadingService.loadingOff()
    })
  );
}
