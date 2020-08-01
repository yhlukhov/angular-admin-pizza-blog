import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url:string

  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000/categories'
  }

  postCategory(category:ICategory):Observable<ICategory> {
    return this.http.post<ICategory>(this.url, category)
  }

  getCategories():Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url)
  }

  deleteCategory(category:ICategory):Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.url}/${category.id}`)
  }
}
