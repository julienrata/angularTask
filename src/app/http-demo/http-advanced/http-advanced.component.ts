import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, Subscription, throwError, timer } from 'rxjs';
import { catchError, finalize, retry, takeUntil } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

import { AdvancedHttpService } from '../services/advanced-http.service';
import { LoaderService } from '../services/loader.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { CacheService } from '../services/cache.service';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { PaginatedResponse } from '../models/api-response.model';

@Component({
  selector: 'app-http-advanced',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './http-advanced.component.html',
  styleUrl: './http-advanced.component.scss'
})
export class HttpAdvancedComponent implements OnInit, OnDestroy {
  // For math operations in template
  Math = Math;
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  
  // Data
  posts: Post[] = [];
  users: User[] = [];
  selectedPost: Post | null = null;
  postIdToLoad: number = 1;
  
  // Batch request controls
  userIds: number[] = [1, 2, 3, 4, 5];
  batchResults: User[] = [];
  
  // Error simulation
  errorUrl = 'https://jsonplaceholder.typicode.com/invalid-endpoint';
  simulatedError: string | null = null;
  
  // Loading state
  isLoading = false;
  
  // Subscriptions to manage
  private subscriptions = new Subscription();
  
  // Flag for request cancellation demo
  isRequestCanceled = false;

  constructor(
    private advancedHttpService: AdvancedHttpService,
    public loaderService: LoaderService,
    private errorHandler: ErrorHandlerService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    // Subscribe to error updates
    this.subscriptions.add(
      this.errorHandler.error$.subscribe(error => {
        this.simulatedError = error ? error.message : null;
      })
    );
    
    // Initial data load
    this.loadPosts();
  }

  ngOnDestroy(): void {
    // Clean up all subscriptions
    this.subscriptions.unsubscribe();
  }

  // Get posts with pagination
  loadPosts(): void {
    this.isLoading = true;
    
    this.advancedHttpService.getPosts(this.currentPage, this.pageSize)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: PaginatedResponse<Post>) => {
          this.posts = response.data;
          this.totalItems = response.total;
          this.currentPage = response.page;
        },
        error: (error: HttpErrorResponse) => {
          this.errorHandler.handleHttpError(error);
        }
      });
  }

  // Change page
  changePage(page: number): void {
    if (page < 1) page = 1;
    const maxPage = Math.ceil(this.totalItems / this.pageSize);
    if (page > maxPage) page = maxPage;
    
    this.currentPage = page;
    this.loadPosts();
  }

  // Get a specific post
  getPost(id: number): void {
    this.isLoading = true;
    this.selectedPost = null;
    
    this.advancedHttpService.getPost(id)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (post: Post) => {
          this.selectedPost = post;
        },
        error: (error: HttpErrorResponse) => {
          this.errorHandler.handleHttpError(error);
        }
      });
  }

  // Batch get users (demonstrating forkJoin for parallel requests)
  batchGetUsers(): void {
    if (this.userIds.length === 0) {
      this.errorHandler.handleError(new Error('No user IDs selected'));
      return;
    }
    
    this.isLoading = true;
    this.batchResults = [];
    
    // Create an array of observables for each user request
    const userRequests: Observable<User>[] = this.userIds.map(id => 
      this.advancedHttpService.getUser(id).pipe(
        catchError(error => {
          console.error(`Error fetching user ${id}:`, error);
          // Handle individual request error but don't fail the entire batch
          return throwError(() => new Error(`Failed to fetch user ${id}`));
        })
      )
    );
    
    // Use forkJoin to execute requests in parallel
    forkJoin(userRequests)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (users: User[]) => {
          this.batchResults = users;
        },
        error: (error) => {
          // This will only be called if all requests fail
          this.errorHandler.handleError(error);
        }
      });
  }

  // Simulate an error
  simulateError(): void {
    this.isLoading = true;
    
    this.advancedHttpService.getErrorResponse()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          // This shouldn't execute
          console.log('This should not happen');
        },
        error: (error: HttpErrorResponse) => {
          this.errorHandler.handleHttpError(error);
        }
      });
  }

  // Retry on error example
  simulateRetry(): void {
    this.isLoading = true;
    
    this.advancedHttpService.getErrorResponse()
      .pipe(
        retry(3), // Retry 3 times before giving up
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          // This shouldn't execute
          console.log('This should not happen');
        },
        error: (error: HttpErrorResponse) => {
          // Create a new HttpErrorResponse instead of a regular Error
          const retryError = new HttpErrorResponse({
            error: 'Request failed after 3 retries',
            status: error.status,
            statusText: error.statusText,
            url: error.url || undefined
          });
          this.errorHandler.handleHttpError(retryError);
        }
      });
  }

  // Demonstrate request cancellation
  demonstrateCancellation(): void {
    this.isLoading = true;
    this.isRequestCanceled = false;
    
    const source$ = timer(0, 1000); // Emit 0, 1, 2... at 1 second intervals
    const cancel$ = timer(3000);    // Emit a value after 3 seconds
    
    this.subscriptions.add(
      source$
        .pipe(
          takeUntil(cancel$),
          finalize(() => {
            this.isLoading = false;
            this.isRequestCanceled = true;
          })
        )
        .subscribe({
          next: (value) => {
            console.log(`Timer: ${value}`);
          },
          complete: () => {
            console.log('Request canceled by takeUntil()');
          }
        })
    );
  }

  // Cache management
  clearCache(): void {
    this.cacheService.clearCache();
  }

  // Error handling
  clearErrors(): void {
    this.errorHandler.clearError();
    this.simulatedError = null;
  }
  
  // Update selected user IDs for batch operations
  updateUserIds(id: number, event: any): void {
    const checked = event.target.checked;
    
    if (checked && !this.userIds.includes(id)) {
      this.userIds.push(id);
    } else if (!checked && this.userIds.includes(id)) {
      this.userIds = this.userIds.filter(userId => userId !== id);
    }
  }
}
