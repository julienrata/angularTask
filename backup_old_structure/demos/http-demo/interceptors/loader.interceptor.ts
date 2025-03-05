import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Start loading
    this.loaderService.showLoader();
    
    // Pass the request to the next handler and use finalize to run code when the request completes
    return next.handle(request).pipe(
      finalize(() => {
        // Hide loader when the request completes (success or error)
        this.loaderService.hideLoader();
      })
    );
  }
}