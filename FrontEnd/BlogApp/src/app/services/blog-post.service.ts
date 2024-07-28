import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private apiUrl = 'http://localhost:6123/api/blogpost'; // Update with your API URL
  private blogPostsSubject = new BehaviorSubject<BlogPost[]>([]);
  blogPosts$ = this.blogPostsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getBlogPosts(): void {
    this.http.get<BlogPost[]>(this.apiUrl).pipe(
      tap(posts => this.blogPostsSubject.next(posts))
    ).subscribe();
  }

  createBlogPost(post: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.apiUrl, post).pipe(
      tap(newPost => {
        const posts = this.blogPostsSubject.getValue();
        this.blogPostsSubject.next([...posts, newPost]);
      })
    );
  }

  updateBlogPost(post: BlogPost): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${post.id}`, post).pipe(
      tap(() => {
        const posts = this.blogPostsSubject.getValue().map(p => p.id === post.id ? post : p);
        this.blogPostsSubject.next(posts);
      })
    );
  }

  deleteBlogPost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const posts = this.blogPostsSubject.getValue().filter(post => post.id !== id);
        this.blogPostsSubject.next(posts);
      })
    );
  }
}