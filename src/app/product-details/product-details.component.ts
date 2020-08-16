import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/shared/interfaces/product.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product:IProduct

  constructor(
    private prodService: ProductService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getMyProduct()
  }

  getMyProduct() {
    const id = +this.actRoute.snapshot.paramMap.get('id')
    this.prodService.getOneProduct(id).subscribe(data =>{
      this.product = data
    })
  }
}
