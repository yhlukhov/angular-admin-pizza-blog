import { Injectable } from '@angular/core';
import { IBlog } from '../../shared/interfaces/blog.interface';
import { Blog } from '../../shared/models/blog.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private url:string
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000/blogs'
  }

  postBlog(blog:IBlog):Observable<IBlog> {
    return this.http.post<IBlog>(this.url, blog)
  }

  getBlogs():Observable<Array<IBlog>> {
    return this.http.get<Array<IBlog>>(this.url)
  }

  updateBlog(blog:IBlog):Observable<IBlog> {
    return this.http.put<IBlog>(`${this.url}/${blog.id}`, blog)
  }

  deleteBlog(id:number | string):Observable<IBlog> {
    return this.http.delete<IBlog>(`${this.url}/${id}`)
  }
}
