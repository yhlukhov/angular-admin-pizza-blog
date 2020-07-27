import { Component, OnInit } from '@angular/core';
import { IBlog } from '../../shared/interfaces/blog.interface';
import { Blog } from '../../shared/models/blog.model';
import { BlogService } from '../../shared/services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogList: Array<IBlog>
  constructor(private blogService:BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(data => {
      this.blogList = data
    })
  }

}
