import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export const Intercept: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    setHeaders: {
      'x-api-key': environment.apiKey
    }
  });


  return next(newReq);
};
