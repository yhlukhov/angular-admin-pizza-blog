import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url:string;
  constructor(private http:HttpClient, private firestore: AngularFirestore) {
    this.url = "http://localhost:3000/products" 
  }
  
  getJSONProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }
  
  getFireCloudProducts(): Observable<DocumentChangeAction<unknown>[]> { // Firestore
    return this.firestore.collection('products').snapshotChanges()
  }

  postJSONProduct(product:IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, product)
  }

  postFireCloudProduct(product: IProduct): Promise<DocumentReference> { // Firestore
    return this.firestore.collection('products').add(product)
  }

  deleteJSONProduct(id:number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.url}/${id}`)
  }

  deleteFireCloudProduct(product: any) { // Firestore
    this.firestore.collection('products').doc(product.id).delete()
  }

  updateJSONProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/${product.id}`, product);
  }

  updateFireCloudProduct(product: any) { //Firestore
    this.firestore.collection('products').doc(product.id.toString()).update(product)
  }

  getCategoryProducts(name:string):Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${name}`)
  }

  getOneProduct(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(`${this.url}/${id}`)
  }
}
