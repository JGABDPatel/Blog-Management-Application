import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blog-post-form',
  templateUrl: './blog-post-form.component.html',
  styleUrls: ['./blog-post-form.component.css']
})
export class BlogPostFormComponent implements OnInit {
  blogPostForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BlogPostFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BlogPost
  ) {
    this.blogPostForm = this.fb.group({
      id: [data.id],
      username: [data.username, Validators.required],
      dateCreated: [new Date(), Validators.required],
      text: [data.text, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.blogPostForm.invalid) {
      return;
    }
    this.dialogRef.close(this.blogPostForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}