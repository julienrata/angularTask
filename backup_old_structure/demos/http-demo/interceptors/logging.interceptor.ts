import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const startTime = Date.now();
    let statusCode: number;
    
    return next.handle(request).pipe(
      tap({
        // Log when the request is sent
        next: (event) => {
          if (event instanceof HttpResponse) {
            statusCode = event.status;
            const endTime = Date.now();
            const duration = endTime - startTime;
            console.log(`🌐 [${request.method}] ${request.urlWithParams} - ${statusCode} - ${duration}ms`);
          }
        },
        // Log when an error occurs
        error: (error) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          console.error(`❌ [${request.method}] ${request.urlWithParams} - Error - ${duration}ms`, error);
        }
      })
    );
  }
}