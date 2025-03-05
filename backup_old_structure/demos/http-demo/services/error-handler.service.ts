import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppError {
  message: string;
  status?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorSubject = new BehaviorSubject<AppError | null>(null);
  
  // Expose errors as an observable
  error$: Observable<AppError | null> = this.errorSubject.asObservable();

  constructor() {}

  // Handle HTTP errors
  handleHttpError(error: HttpErrorResponse): void {
    const appError: AppError = {
      message: this.getErrorMessage(error),
      status: error.status,
      timestamp: new Date()
    };
    
    this.errorSubject.next(appError);
    console.error('HTTP Error:', appError);
  }

  // Handle general application errors
  handleError(error: Error): void {
    const appError: AppError = {
      message: error.message,
      timestamp: new Date()
    };
    
    this.errorSubject.next(appError);
    console.error('Application Error:', appError);
  }

  // Clear the current error
  clearError(): void {
    this.errorSubject.next(null);
  }

  // Get a user-friendly error message based on the HTTP error
  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return `Client Error: ${error.error.message}`;
    }
    
    // Server-side error
    switch (error.status) {
      case 0:
        return 'Server unreachable. Please check your internet connection.';
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please log in again.';
      case 403:
        return 'Forbidden. You do not have permission to access this resource.';
      case 404:
        return 'Resource not found.';
      case 422:
        return 'Validation error. Please check your input.';
      case 500:
        return 'Internal server error. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return `Server Error: ${error.status} ${error.statusText}`;
    }
  }
}