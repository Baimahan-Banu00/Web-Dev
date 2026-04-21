// src/app/interceptors/auth-interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Добавляем токен к каждому запросу если он есть
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Токен истёк — выходим
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};