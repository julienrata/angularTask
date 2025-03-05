import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, share } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Only cache GET requests
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    // Create a cache key from the request URL
    const cacheKey = request.urlWithParams;
    
    // Check if we have a cached response
    const cachedResponse = this.cacheService.get(cacheKey);
    
    // Return cached response if available
    if (cachedResponse) {
      console.log(`🔄 [CACHE HIT] ${cacheKey}`);
      return of(cachedResponse.clone());
    }

    // No cache hit, forward request to next handler
    return next.handle(request).pipe(
      tap(event => {
        // Store the response in cache if it's a HttpResponse
        if (event instanceof HttpResponse) {
          this.cacheService.set(cacheKey, event.clone());
        }
      }),
      // Use share to prevent duplicate requests
      share()
    );
  }
}