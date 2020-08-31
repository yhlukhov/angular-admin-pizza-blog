import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userFirstName:string
  userLastName:string
  userEmail:string

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.getUserData()
  }

  private getUserData() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userFirstName = user.firstName
    this.userLastName = user.lastName
    this.userEmail = user.email
  }

  signOut() {
    this.authService.signOut()
  }
}
