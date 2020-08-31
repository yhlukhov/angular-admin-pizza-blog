import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/shared/services/discount.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable, ObjectUnsubscribedError } from 'rxjs';
import { IDiscount } from 'src/shared/interfaces/discount.interface';
import { Discount } from 'src/shared/models/discount.model';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  discountList: Array<IDiscount> = []
  filterStr = ''
  modalRef: BsModalRef
  dTitle: string
  dText: string
  dImage: string
  imageStatus: boolean
  uploadProgress: Observable<Number>
  discountBox: IDiscount
  down = true
  up = false
  sortId = true
  sortTitle = false
  sortText = false
  sortDirection = 'asc'
  sortColumn = 'id'

  constructor(
    private modalService: BsModalService,
    private discountService: DiscountService,
    private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.loadDiscounts()
  }

  loadDiscounts() {
    // this.discountService.getDiscountsList().subscribe(data => {
    //   this.discountList = data
    // })
    this.discountService.getFireCloudDiscounts().subscribe(collection => {
      this.discountList = collection.map(discount => {
        const data = discount.payload.doc.data() as IDiscount
        const id = discount.payload.doc.id
        return { id, ...data }
      })
    })
  }

  uploadFile(event) {
    {
      const file = event.target.files[0];
      const type = file.type.slice(file.type.indexOf('/') + 1);
      const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
      const filePath = `images/${name}.${type}`;
      const task = this.afStorage.upload(filePath, file);
      this.uploadProgress = task.percentageChanges();
      task.then(image => {
        this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
          this.dImage = url;
          this.imageStatus = true;
        });
      });
    }
  }

  delImage() {
    this.dImage = ''
    this.imageStatus = false
    document.getElementById('imageLoad').style.width = '0%'
  }

  addDiscount() {
    const discount = new Discount(1, this.dTitle, this.dText, this.dImage)
    delete (discount.id)
    // this.discountService.addDiscount(discount).subscribe(() => {
    //   this.loadDiscounts()
    //   this.modalRef.hide()
    // })
    this.discountService.postFireCloudDiscount(Object.assign({}, discount)).then(message => {
      console.log(message)
      this.modalRef.hide()
      this.loadDiscounts()
    })
      .catch(err => console.log(err))
  }

  updateDiscount(discount: IDiscount) {
    discount.title = this.dTitle
    discount.text = this.dText
    discount.image = this.dImage
    // this.discountService.updateDiscount(discount).subscribe(() => {
    //   this.loadDiscounts()
    //   this.modalRef.hide()
    // })
    this.discountService.updateFireCloudDiscount(discount)
    this.loadDiscounts()
    this.modalRef.hide()
  }

  deleteDisc(discount: IDiscount) {
    // this.discountService.deleleDiscount(discount.id).subscribe(() => {
    //   this.loadDiscounts()
    //   this.modalRef.hide()
    // })
    this.discountService.deleteFireCloudDiscount(discount)
  }

  openModal(template, discount?: IDiscount) {
    this.modalRef = this.modalService.show(template)
    if (discount) {
      this.discountBox = discount
      this.dTitle = discount.title
      this.dText = discount.text
      this.dImage = discount.image
      this.imageStatus = true
    }
  }

  sort(val: string) {
    switch (val) {
      case 'id':
        this.sortId === true ? this.up = !this.up : this.sortId = true
        this.sortTitle = this.sortText = false
        break
      case 'title':
        this.sortTitle === true ? this.up = !this.up : this.sortTitle = true
        this.sortId = this.sortText = false
        break
      case 'text':
        this.sortText === true ? this.up = !this.up : this.sortText = true
        this.sortId = this.sortTitle = false
        break
    }
    this.sortColumn = 'id'
    this.up ? this.sortDirection = 'desc' : this.sortDirection = 'asc'
  }

}
