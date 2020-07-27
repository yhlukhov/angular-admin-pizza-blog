import { Component, OnInit } from '@angular/core';
import { IBlog } from '../../../shared/interfaces/blog.interface';
import { Blog } from '../../../shared/models/blog.model';
import { BlogService } from '../../../shared/services/blog.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogList: Array<IBlog>
  blogTitle = ""
  blogText = ""
  blogAuthor = ""
  validInput = true
  editStatus = false
  editId = -1
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlogList()
  }

  addBlog() {

    if (this.blogTitle.length > 0 && this.blogText.length > 0 && this.blogAuthor.length > 0) {
      const blog = new Blog(this.editId, this.blogTitle, this.blogText, new Date(), this.blogAuthor, "../../assets/pizza.jpg")
      if (!this.editStatus) {
        delete blog.id
        this.blogService.postBlog(blog).subscribe(() => {
          this.getBlogList()
        })
      }
      else {
        if (confirm("Are you sure you want to edit this blog?")) {
          this.blogService.updateBlog(blog).subscribe(()=>{
            this.getBlogList()
          })
        }
        this.editStatus = false
      }
      this.clearInput()
    }
    else this.validInput = false
  }

  editBlog(blog: IBlog) {
    this.editId = blog.id
    this.editStatus = true
    this.addBlog()
  }

  deleteBlog(blog: IBlog) {
    if (confirm("Are you sure you want to delete this record?"))
      this.blogService.deleteBlog(blog.id).subscribe(() => {
        this.getBlogList()
      })
  }

  getBlogList() {
    this.blogService.getBlogs().subscribe(data => {
      this.blogList = data
    })
  }

  clearInput() {
    this.blogAuthor = ''
    this.blogText = ''
    this.blogTitle = ''
    this.validInput = true
  }
}