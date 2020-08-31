import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/shared/interfaces/product.interface';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  totalPrice = 0
  isLogin = true
  modalRef: BsModalRef
  private basket: Array<IProduct>
  user: any
  urlName: string
  menuName: string
  statusLogin: boolean

  registerForm = new FormGroup({
    fName: new FormControl('', [Validators.required, Validators.min(2)]),
    lName: new FormControl('', [Validators.required, Validators.min(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private orderService: OrderService,
    public authService: AuthService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getLocalStorage()
    this.subscribeBasket()
    this.checkUser()
    this.updateCheckUser()
  }

  private subscribeBasket() {
    this.orderService.basket.subscribe(() => {
      this.getLocalStorage()
    })
  }
  private getLocalStorage() {
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      const localProducts = JSON.parse(localStorage.getItem('myOrder'))
      this.totalPrice = localProducts.reduce((total, prod) => {
        return total + prod.count * prod.price
      }, 0)
    }
    else this.totalPrice = 0
  }

  register() {
    const { fName, lName, email, password } = this.registerForm.value
    this.authService.signUp(fName, lName, email, password)
    this.user = JSON.parse(localStorage.getItem('user'))
    // this.registerForm.reset()
    this.modalRef.hide()
  }

  login() {
    const { email, password } = this.loginForm.value
    this.authService.signIn(email, password)
    this.user = JSON.parse(localStorage.getItem('user'))
    // this.loginForm.reset()
    this.modalRef.hide()
  }

  openModal(template) {
    this.modalRef = this.modalService.show(template)
  }

  switchLoginRegister() {
    this.isLogin = !this.isLogin
  }

  updateCheckUser() {
    this.authService.userStatusChange.subscribe(() => {
      this.checkUser()
    })
  }

  checkUser() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user != null) {
      if (user.role === 'admin') {
        this.urlName = 'admin'
        this.menuName = 'адмін'
        this.statusLogin = true
      }
      else if (user.role === 'user') {
        this.urlName = 'profile'
        this.menuName = 'кабінет'
        this.statusLogin = true
      }
    }
    else {
      this.statusLogin = false
      this.urlName = ''
      this.menuName = ''
    }
  }

}
