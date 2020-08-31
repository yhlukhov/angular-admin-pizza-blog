import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/shared/interfaces/product.interface';
import { OrderService } from '../../shared/services/order.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct

  constructor(
    private prodService: ProductService,
    private orderService: OrderService,
    private firestore: AngularFirestore,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getMyProduct()
  }

  getMyProduct() {
    const id = this.actRoute.snapshot.paramMap.get('id')
    // this.prodService.getOneProduct(id).subscribe(data =>{
    //   this.product = data
    // })

    this.firestore.collection('products').snapshotChanges().subscribe(data => {
      const products = data.map(prod => {
        const data = prod.payload.doc.data() as IProduct
        const id = prod.payload.doc.id
        return { id, ...data }
      })
      this.product = products.find(prod => prod.id.toString() == id)
    })
  }

  addBasket(product: IProduct) {
    let localProducts: Array<IProduct> = []
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'))
      if (localProducts.some(prod => product.id === prod.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id)
        localProducts[index].count += product.count
      }
      else localProducts.push(product)
    }
    else {
      localProducts.push(product)
    }
    localStorage.setItem("myOrder", JSON.stringify(localProducts))
    this.orderService.basket.next(localProducts)
    product.count = 1
  }
}
