import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout, map } from 'rxjs/operators';
import { Post, PostCreate, PostUpdate } from '../models/post.model';
import { User } from '../models/user.model';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AdvancedHttpService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // Advanced GET with query params, headers and error handling
  getPosts(page = 1, limit = 10): Observable<PaginatedResponse<Post>> {
    // Define request parameters
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    // Define request headers
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-Custom-Header', 'CustomValue');

    // Making the request with params, headers, and error handling
    return this.http.get<Post[]>(`${this.apiUrl}/posts`, { 
      params,
      headers,
      observe: 'response' // Get the full response, not just the body
    }).pipe(
      timeout(10000), // Timeout after 10 seconds
      retry(2), // Retry failed requests up to 2 times
      map(response => {
        // Convert response to PaginatedResponse format
        return {
          data: response.body || [],
          total: parseInt(response.headers.get('X-Total-Count') || '0', 10),
          page,
          limit
        };
      }),
      catchError(this.handleError)
    );
  }

  // GET with path parameters and error handling
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // POST with response type and error handling
  createPost(post: PostCreate): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // PUT with full update
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${post.id}`, post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // PATCH with partial update
  patchPost(id: number, changes: Partial<Post>): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/posts/${id}`, changes, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE with responseType
  deletePost(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`, {
      observe: 'response'
    }).pipe(
      map(response => ({ success: response.status === 200 })),
      catchError(this.handleError)
    );
  }
  
  // Method to simulate errors for demonstration
  getErrorResponse(): Observable<never> {
    return this.http.get<never>(`${this.apiUrl}/nonexistent-endpoint`)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  // Method to get a specific user
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Batch operations example (multiple requests)
  batchGetUsers(ids: number[]): Observable<User[]> {
    // Create an array of observables (one for each user request)
    const requests = ids.map(id => 
      this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
        catchError(error => {
          console.error(`Error fetching user ${id}:`, error);
          // Return an empty user object instead of failing the entire batch
          return throwError(() => new Error(`Failed to fetch user ${id}`));
        })
      )
    );

    // Use forkJoin to wait for all requests to complete
    // This is handled in the component to demonstrate different approaches
    return throwError(() => new Error('Implemented in component'));
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      // Handle specific status codes
      switch (error.status) {
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 403:
          errorMessage = 'Access forbidden';
          break;
        case 401:
          errorMessage = 'Unauthorized access';
          break;
        case 400:
          errorMessage = 'Bad request';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
      }
    }
    
    console.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}