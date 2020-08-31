import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { Category } from '../../../shared/models/category.model';
import { CategoryService } from '../../../shared/services/category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  modalRef: BsModalRef;
  categoryList: Array<ICategory>
  nameEN: string
  nameUA: string
  categoryValidInput = true
  sortIdUp = false
  sortIdDown = true
  sortNameEnUp = false
  sortNameEnDown = false
  sortNameUaUp = false
  sortNameUaDown = false
  filterStr = ''
  editMode = false
  editCat: ICategory
  //popower
  popoverTitle = 'Delete category'
  popoverMessage = 'Are you sure you want to delete the category?'
  confirmText = 'Delete'

  constructor(
    public categoryService: CategoryService,
    private modalService: BsModalService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    // this.getCategoryList()
    this.getFBCategoryList()
  }

  getCategoryList() {
    this.categoryService.getCategories().subscribe(data => {
      this.categoryList = data
    })
  }

  getFBCategoryList() {
    this.categoryService.getFireCloudCategories().subscribe(collection => {
      this.categoryList = collection.map(category => {
        const data = category.payload.doc.data() as ICategory
        const id = category.payload.doc.id
        return {id, ...data}
      })
    })
  }

  addCategory() {
    if (this.nameEN && this.nameUA) {
      let cat = new Category(1, this.nameEN, this.nameUA)
      delete (cat.id)
      // this.categoryService.postCategory(cat).subscribe(() => {
      //   this.getCategoryList()
      // })
      this.categoryService.postFireCloudCategory(Object.assign({}, cat)).then(()=>{
        console.log('category added')
      })
      this.clearInput()
    }
    else this.categoryValidInput = false
  }

  deleteCategory(category) {
    // this.categoryService.deleteCategory(category).subscribe(() => {
    //   this.getCategoryList()
    // })
    this.categoryService.deleteFireCloudCategory(category)
  }

  editCategory() {
    this.editCat.nameEN = this.nameEN
    this.editCat.nameUA = this.nameUA
    this.categoryService.updateFireCloudCategory(this.editCat)
  }

  closeModal() {
    this.clearInput()
    this.modalRef.hide()
  }

  clearInput() {
    this.nameEN = ''
    this.nameUA = ''
    this.categoryValidInput = true
  }

  openAddModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editMode = false
  }
  openEditModal(template: TemplateRef<any>, category: ICategory) {
    this.modalRef = this.modalService.show(template);
    this.editCat = category
    this.editMode = true
    this.nameEN = category.nameEN
    this.nameUA = category.nameUA
  }

  // SORT

  sort(type: string) {
    let upDown: number
    switch (type) {
      case 'id':
        this.sortIdUp = this.sortIdDown
        this.sortIdDown = !this.sortIdDown
        this.sortNameEnUp = this.sortNameEnDown = this.sortNameUaUp = this.sortNameUaDown = false
        this.sortIdDown ? upDown = -1 : upDown = 1
        this.categoryList.sort((a, b): number => {
          if (a.id > b.id) return upDown
          else return -upDown
        })
        break
      case 'en':
        this.sortNameEnUp = this.sortNameEnDown
        this.sortNameEnDown = !this.sortNameEnDown
        this.sortIdUp = this.sortIdDown = this.sortNameUaUp = this.sortNameUaDown = false
        this.sortNameEnDown ? upDown = -1 : upDown = 1
        this.categoryList.sort((a, b): number => {
          if (a.nameEN < b.nameEN) return upDown
          else return -upDown
        })
        break
      case 'ua':
        this.sortNameUaUp = this.sortNameUaDown
        this.sortNameUaDown = !this.sortNameUaDown
        this.sortIdUp = this.sortIdDown = this.sortNameEnUp = this.sortNameEnDown = false
        this.sortNameUaDown ? upDown = -1 : upDown = 1
        this.categoryList.sort((a, b): number => {
          if (a.nameUA < b.nameUA) return upDown
          else return -upDown
        })
        break
    }
  }
}

