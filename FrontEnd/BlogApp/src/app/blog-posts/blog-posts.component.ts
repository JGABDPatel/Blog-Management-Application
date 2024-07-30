import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostFormComponent } from '../blog-post-form/blog-post-form.component';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;
  search = '';

  constructor(
    private blogPostService: BlogPostService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts(search: string = '', page: number = 1): void { 
    this.blogPostService.getBlogPosts(search, page, this.pageSize).subscribe({
      next: (response) => {
        this.blogPosts = response.data;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.currentPage = page;
      },
      error: () => {
        this.toastr.error('Failed to load blog posts');
      }
    });
  }

  applyFilter(event: Event): void { 
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.loadBlogPosts(filterValue.toLocaleLowerCase());
  } 

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.loadBlogPosts(this.search, page);
  } 

  openAddDialog(): void {
    const dialogRef = this.dialog.open(BlogPostFormComponent, {
      width: '500px',
      data: { id: 0, username: '', dateCreated: new Date(), text: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blogPostService.createBlogPost(result).subscribe(() => {
          this.loadBlogPosts();
          this.toastr.success('Blog post created successfully');
        },(err) => {
          this.toastr.error(err.error);
        });
      }
    });
  }

  openEditDialog(post: BlogPost): void {
    const dialogRef = this.dialog.open(BlogPostFormComponent, {
      width: '500px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blogPostService.updateBlogPost(result).subscribe(() => {
          this.loadBlogPosts();
          this.toastr.success('Blog post updated successfully');
        },(err) => {
          this.toastr.error(err.error);
        });
      }
    });
  }

  deleteBlogPost(id: number): void {
    this.blogPostService.deleteBlogPost(id).subscribe(() => {
      this.loadBlogPosts();
      this.toastr.success('Blog post deleted successfully');
    },(err) => {
      this.toastr.error(err.error);
    });
  }
}