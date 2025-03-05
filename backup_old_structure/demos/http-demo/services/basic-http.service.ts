import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PostCreate, PostUpdate } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BasicHttpService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // GET requests
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // POST request
  createPost(post: PostCreate): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }

  // PUT request - full update
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${post.id}`, post);
  }

  // PATCH request - partial update
  patchPost(post: PostUpdate): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/posts/${post.id}`, post);
  }

  // DELETE request
  deletePost(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.apiUrl}/posts/${id}`);
  }
}