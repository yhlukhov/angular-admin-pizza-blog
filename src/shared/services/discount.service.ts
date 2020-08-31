import { Injectable } from '@angular/core';
import {IDiscount } from 'src/shared/interfaces/discount.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private url:string;
  constructor(private http:HttpClient, private firestore: AngularFirestore) {
    this.url = "http://localhost:3000/discounts" 
  }
  getDiscountsList():Observable<Array<IDiscount>> {
    return this.http.get<Array<IDiscount>>(this.url)
  }
  getFireCloudDiscounts(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('discounts').snapshotChanges()
  }

  addDiscount(disc:IDiscount):Observable<IDiscount> {
    return this.http.post<IDiscount>(this.url, disc)
  }
  postFireCloudDiscount(discont: IDiscount): Promise<DocumentReference> {
    return this.firestore.collection('discounts').add(discont)
  }

  deleleDiscount(id:number):Observable<IDiscount> {
    return this.http.delete<IDiscount>(`${this.url}/${id}`)
  }
  deleteFireCloudDiscount(discount: any) {
    this.firestore.collection('discounts').doc(discount.id).delete()
  }

  updateDiscount(discount:IDiscount):Observable<IDiscount> {
    return this.http.put<IDiscount>(`${this.url}/${discount.id}`, discount)
  }
  updateFireCloudDiscount(discount: any) {
    this.firestore.collection('discounts').doc(discount.id).update(discount)
  }
}
