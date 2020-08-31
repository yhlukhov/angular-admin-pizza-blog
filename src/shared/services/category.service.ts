import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) {
    this.url = 'http://localhost:3000/categories'
  }

  postCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.url, category)
  }
  postFireCloudCategory(category: ICategory): Promise<DocumentReference> {
    return this.firestore.collection('categories').add(category)
  }

  getCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url)
  }
  getFireCloudCategories(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('categories').snapshotChanges()
  }

  updateFireCloudCategory(category: any) {
    this.firestore.collection('categories').doc(category.id).update(category)
  }

  deleteCategory(category: ICategory): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.url}/${category.id}`)
  }
  deleteFireCloudCategory(category: any) {
    this.firestore.collection('categories').doc(category.id).delete()
  }

}
