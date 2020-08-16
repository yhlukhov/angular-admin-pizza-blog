import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { IProduct } from '../../../shared/interfaces/product.interface';
import { Product } from '../../../shared/models/product.model';
import { from, Observable } from 'rxjs';
import { ICategory } from 'src/shared/interfaces/category.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  filterStr = '';
  modalRef: BsModalRef;
  uploadProgress: Observable<Number>;
  categoryList: Array<ICategory>;
  productList: Array<IProduct>;
  productCategory: ICategory;
  categoryName: string;
  productID: number;
  productNameEN: string;
  productNameUA: string;
  productDescription: string;
  productWeight: string;
  productPrice: number;
  productImage: string;
  imageStatus: boolean;
  editDeleteProd: IProduct;
  productValidInput = true;
  order = 'id'
  reverse = false

  constructor(
    public productService: ProductService,
    private modalService: BsModalService,
    public categoryService: CategoryService,
    private afStorage: AngularFireStorage,
    private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    this.getProductsList()
    this.getCategoryList()
  }

  getProductsList() {
    this.productService.getJSONProducts().subscribe(data => {
      this.productList = data
    })
  }

  getCategoryList() {
    this.categoryService.getCategories().subscribe(data => {
      this.categoryList = data
    })
  }

  setCategory() {
    this.productCategory = this.categoryList.find(cat => cat.nameEN === this.categoryName)
  }

  addProduct(): void {
    this.setCategory()
    if (this.checkProductInputValid()) {
      this.productValidInput = true
      const product: IProduct = new Product(
        this.productID,
        this.productCategory,
        this.productNameEN,
        this.productNameUA,
        this.productDescription,
        this.productWeight,
        this.productPrice,
        this.productImage);
      delete product.id;
      this.productService.postJSONProduct(product).subscribe(
        () => {
          this.getProductsList();
          this.modalRef.hide()
        }
      )
      this.clearFields()
    }
    else this.productValidInput = false
  }

  editProduct(): void {
    this.setCategory()
    if (this.checkProductInputValid()) {
      this.productValidInput = true
      this.editDeleteProd.category = this.productCategory
      this.editDeleteProd.nameEN = this.productNameEN
      this.editDeleteProd.nameUA = this.productNameUA
      this.editDeleteProd.description = this.productDescription
      this.editDeleteProd.weight = this.productWeight
      this.editDeleteProd.price = this.productPrice
      this.editDeleteProd.image = this.productImage
      this.productService.updateJSONProduct(this.editDeleteProd).subscribe(() => {
        this.getProductsList()
        this.modalRef.hide()
      })
    }
    else this.productValidInput = false
  }

  checkProductInputValid(): boolean {
    if (this.productCategory && this.productNameEN && this.productNameUA && this.productDescription && this.productWeight && this.productPrice && this.productImage) return true
    else return false
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
        this.imageStatus = true;
      });
    });
  }

  clearFields() {
    this.productNameEN = ''
    this.productNameUA = ''
    this.productDescription = ''
    this.productWeight = ''
    this.productPrice = null
    this.productImage = ''
    this.imageStatus = false
  }

  deleteProduct() {
    this.productService.deleteJSONProduct(this.editDeleteProd.id).subscribe(() => {
      this.getProductsList()
      this.modalRef.hide()
    })
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalEdit(template: TemplateRef<any>, prod: IProduct) {
    this.editDeleteProd = prod;
    this.modalRef = this.modalService.show(template)
    this.categoryName = prod.category.nameEN
    this.productNameEN = prod.nameEN
    this.productNameUA = prod.nameUA
    this.productDescription = prod.description
    this.productWeight = prod.weight
    this.productPrice = prod.price
    this.productImage = prod.image
    this.imageStatus = true
  }

  openModalDel(template: TemplateRef<any>, prod: IProduct) {
    this.editDeleteProd = prod;
    this.modalRef = this.modalService.show(template)
  }
  closeModal() {
    this.modalRef.hide()
  }

  removeImage() {
    this.imageStatus = false
  }

  orderBy(type:string) {
    type === this.order ? this.reverse = !this.reverse : this.order = type
    this.productList = this.orderPipe.transform(this.productList, this.order, this.reverse)
  }

}
