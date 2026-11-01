import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const start: number = performance.now();
  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          console.log(req.method, req.url, event.status, Math.round(performance.now() - start), 'ms');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(req.method, req.url, error.status, error.statusText, Math.round(performance.now() - start), 'ms');
      },
    }),
  );
};
