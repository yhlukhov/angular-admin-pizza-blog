import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  productTabActive = true
  categoryTabActive = false
  blogTabActive = false
  constructor() { }

  ngOnInit(): void {
  }

  focus(tabIndex:number) {
    if(tabIndex == 1) {
      this.productTabActive = true
      this.categoryTabActive = false
      this.blogTabActive = false
    }
    else if (tabIndex == 2) {
      this.productTabActive = false
      this.categoryTabActive = true
      this.blogTabActive = false
    }
    else if (tabIndex == 3) {
      this.productTabActive = false
      this.categoryTabActive = false
      this.blogTabActive = true
    }
  }

}
