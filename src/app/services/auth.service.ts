import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simulate authentication state (in a real app, this would be based on JWT tokens, etc.)
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // For demo purposes, let's check localStorage
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(): void {
    // Simulate successful login
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('isAuthenticated', 'true');
  }

  logout(): void {
    // Simulate logout
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('isAuthenticated');
  }

  // Helper method to get current auth state synchronously
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}