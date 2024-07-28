import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blog-post-form',
  templateUrl: './blog-post-form.component.html',
  styleUrls: ['./blog-post-form.component.css']
})
export class BlogPostFormComponent implements OnInit, OnChanges {
  @Input() post: BlogPost | null = null;
  @Output() save = new EventEmitter<BlogPost>();
  @Output() update = new EventEmitter<BlogPost>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [0],
      username: ['', Validators.required],
      dateCreated: [new Date(), Validators.required],
      text: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.form.patchValue(this.post);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const post = this.form.value;
      if (post.id === 0) {
        this.save.emit(post);
      } else {
        this.update.emit(post);
      }
      this.cancel.emit();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}