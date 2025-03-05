import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  // Expose the loading state as an observable
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  
  // Track active requests
  private activeRequests = 0;

  constructor() {}

  showLoader(): void {
    // Increment counter and update loading state
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.loadingSubject.next(true);
    }
  }

  hideLoader(): void {
    // Decrement counter and update loading state
    this.activeRequests--;
    if (this.activeRequests === 0) {
      this.loadingSubject.next(false);
    }
  }
}