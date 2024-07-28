import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  editingPost: BlogPost | null = null;

  constructor(private blogPostService: BlogPostService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.blogPostService.blogPosts$.subscribe(posts => {
      this.blogPosts = posts;
    });
    this.blogPostService.getBlogPosts();
  }
  
  startNewPost(): void {
    this.editingPost = { id: 0, username: '', dateCreated: new Date(), text: '' };
  }

  createPost(post: BlogPost): void {
    this.blogPostService.createBlogPost(post).subscribe(
      (res) => {
      this.toastr.success('Blog post created successfully');},
      (err) => {
      this.toastr.error(err.error);
    });
  }

  editPost(post: BlogPost): void {
    this.editingPost = { ...post };
  }

  updatePost(post: BlogPost): void {
    this.blogPostService.updateBlogPost(post).subscribe(
      () => {
      this.editingPost = null;
      this.toastr.success('Blog post updated successfully');},
      (err) => {
      this.toastr.error(err.error);
    });
  }

  deletePost(id: number): void {
    this.blogPostService.deleteBlogPost(id).subscribe(
      () => {
      this.toastr.success('Blog post deleted successfully');},
      (err) => {
        this.toastr.error(err.error);
    });
  }
}