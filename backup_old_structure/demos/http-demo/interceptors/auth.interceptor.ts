import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // This would normally come from an auth service or local storage
    const token = 'example-auth-token';
    
    // Clone the request and add the authorization header
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
    
    // Pass the cloned request to the next handler
    return next.handle(authReq);
  }
}