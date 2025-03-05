import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { BasicHttpService } from '../services/basic-http.service';
import { Post, PostCreate, PostUpdate } from '../models/post.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-http-basics',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './http-basics.component.html',
  styleUrl: './http-basics.component.scss',
})
export class HttpBasicsComponent implements OnInit {
  // Data containers

  codeExample: string = `
  // GET example
  getPosts(): void {
    this.loading = true;
    this.error = null;

    this.httpService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching posts: ' + err.message;
        this.loading = false;
      }
    });
  }

  // POST example
  createPost(): void {
    this.loading = true;
    this.error = null;

    this.httpService.createPost(this.newPost).subscribe({
      next: (createdPost) => {
        this.operationResult = {
          message: 'Post created successfully',
          post: createdPost
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error creating post: ' + err.message;
        this.loading = false;
      }
    });
  }
  `;

  basicHttpServiceCode: string = `
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicHttpService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // GET request
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + '/posts');
  }

  // POST request
  createPost(post: PostCreate): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + '/posts', post);
  }

  // PUT request - full update
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.apiUrl + '/posts/' + post.id, post);
  }

  // PATCH request - partial update
  patchPost(post: PostUpdate): Observable<Post> {
    return this.http.patch<Post>(this.apiUrl + '/posts/' + post.id, post);
  }

  // DELETE request
  deletePost(id: number): Observable<{}> {
    return this.http.delete<{}>(this.apiUrl + '/posts/' + id);
  }
}`;

  posts: Post[] = [];
  users: User[] = [];
  selectedPost: Post | null = null;

  // For create form
  newPost: PostCreate = {
    userId: 1,
    title: '',
    body: '',
  };

  // For update form
  updatedPost: PostUpdate = {
    id: 0,
    title: '',
    body: '',
  };

  // For partial update
  patchTitle = '';

  // For form inputs
  postId: number = 1;
  patchId: number = 1;
  deleteId: number = 1;

  // Loading and error states
  loading = false;
  error: string | null = null;

  // Results after operations
  operationResult: any = null;

  constructor(private basicHttpService: BasicHttpService) {}

  ngOnInit(): void {
    // We'll keep it simple and not fetch data automatically
  }

  // GET all posts
  getPosts(): void {
    this.loading = true;
    this.error = null;
    this.operationResult = null;

    this.basicHttpService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (err) => {
        this.error = `Error fetching posts: ${err.message}`;
        this.loading = false;
      },
    });
  }

  // GET a single post by ID
  getPost(id: number): void {
    this.loading = true;
    this.error = null;
    this.operationResult = null;
    this.selectedPost = null;

    this.basicHttpService.getPost(id).subscribe({
      next: (post) => {
        this.selectedPost = post;
        this.loading = false;
      },
      error: (err) => {
        this.error = `Error fetching post ${id}: ${err.message}`;
        this.loading = false;
      },
    });
  }

  // GET all users
  getUsers(): void {
    this.loading = true;
    this.error = null;
    this.operationResult = null;

    this.basicHttpService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = `Error fetching users: ${err.message}`;
        this.loading = false;
      },
    });
  }

  // POST a new post
  createPost(): void {
    if (!this.newPost.title || !this.newPost.body) {
      this.error = 'Title and body are required';
      return;
    }

    this.loading = true;
    this.error = null;
    this.operationResult = null;

    this.basicHttpService.createPost(this.newPost).subscribe({
      next: (createdPost) => {
        this.operationResult = {
          message: 'Post created successfully',
          post: createdPost,
        };
        this.loading = false;
        // Reset the form
        this.newPost = {
          userId: 1,
          title: '',
          body: '',
        };
      },
      error: (err) => {
        this.error = `Error creating post: ${err.message}`;
        this.loading = false;
      },
    });
  }

  // PUT to update a post
  updatePost(): void {
    if (
      !this.updatedPost.id ||
      !this.updatedPost.title ||
      !this.updatedPost.body
    ) {
      this.error = 'ID, title and body are required for updates';
      return;
    }

    this.loading = true;
    this.error = null;
    this.operationResult = null;

    // For demonstration purposes, we're creating a full post object
    const fullPost: Post = {
      id: this.updatedPost.id,
      userId: 1, // We're assuming userId=1 for simplicity
      title: this.updatedPost.title,
      body: this.updatedPost.body,
    };

    this.basicHttpService.updatePost(fullPost).subscribe({
      next: (updatedPost) => {
        this.operationResult = {
          message: 'Post updated successfully',
          post: updatedPost,
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = `Error updating post: ${err.message}`;
        this.loading = false;
      },
    });
  }

  // PATCH to partially update a post
  patchPost(id: number): void {
    if (!id || !this.patchTitle) {
      this.error = 'ID and new title are required for partial updates';
      return;
    }

    this.loading = true;
    this.error = null;
    this.operationResult = null;

    const patch: PostUpdate = {
      id: id,
      title: this.patchTitle,
    };

    this.basicHttpService.patchPost(patch).subscribe({
      next: (patchedPost) => {
        this.operationResult = {
          message: 'Post title updated successfully',
          post: patchedPost,
        };
        this.loading = false;
        this.patchTitle = '';
      },
      error: (err) => {
        this.error = `Error patching post: ${err.message}`;
        this.loading = false;
      },
    });
  }

  // DELETE a post
  deletePost(id: number): void {
    if (!id) {
      this.error = 'ID is required to delete a post';
      return;
    }

    this.loading = true;
    this.error = null;
    this.operationResult = null;

    this.basicHttpService.deletePost(id).subscribe({
      next: () => {
        this.operationResult = {
          message: `Post ${id} deleted successfully`,
        };
        this.loading = false;

        // Remove the post from the posts array if it exists
        this.posts = this.posts.filter((post) => post.id !== id);

        // Clear selected post if it was deleted
        if (this.selectedPost && this.selectedPost.id === id) {
          this.selectedPost = null;
        }
      },
      error: (err) => {
        this.error = `Error deleting post: ${err.message}`;
        this.loading = false;
      },
    });
  }

  // Set a post for editing
  editPost(post: Post): void {
    this.updatedPost = {
      id: post.id,
      title: post.title,
      body: post.body,
    };
  }

  // Utility method to clear results and errors
  clearResults(): void {
    this.operationResult = null;
    this.error = null;
  }
}
