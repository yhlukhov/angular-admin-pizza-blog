import { Injectable } from '@angular/core';
import {IDiscount } from 'src/shared/interfaces/discount.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private url:string;
  constructor(private http:HttpClient) {
    this.url = "http://localhost:3000/discounts" 
  }
  getDiscountsList():Observable<Array<IDiscount>> {
    return this.http.get<Array<IDiscount>>(this.url)
  }

  addDiscount(disc:IDiscount):Observable<IDiscount> {
    return this.http.post<IDiscount>(this.url, disc)
  }

  deleleDiscount(id:number):Observable<IDiscount> {
    return this.http.delete<IDiscount>(`${this.url}/${id}`)
  }

  updateDiscount(discount:IDiscount):Observable<IDiscount> {
    return this.http.put<IDiscount>(`${this.url}/${discount.id}`, discount)
  }
}
