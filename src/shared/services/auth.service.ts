import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false

  userStatusChange = new Subject<string>()

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) { }

  signIn(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.afStore.collection('users').ref.where('id', '==', user.user.uid)
          .onSnapshot(snap => {
            snap.forEach(userRef => {
              localStorage.setItem('user', JSON.stringify(userRef.data()))
              if (userRef.data().role === 'admin' && userRef.data().access === true) {
                this.router.navigateByUrl('admin')
                this.userStatusChange.next('admin')
              }
              else {
                this.router.navigateByUrl('home')
                this.userStatusChange.next('user')
              }
              this.loggedIn = true
            })
          }
          )
      })
      .catch(err => console.log("Error occured: ", err.message))
  }

  signUp(fName:string, lName:string, email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then((response) => {
      const user = {
        firstName: fName,
        lastName: lName,
        id: response.user.uid,
        email: response.user.email,
        role: 'user'
      }
      this.afStore.collection('users').add(user)
        .then(data => {
          data.get().then(user => {
            localStorage.setItem('user', JSON.stringify(user.data()))
            this.router.navigateByUrl('profile')
            this.loggedIn = true
            this.userStatusChange.next('signin')
          })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
      .catch(err => console.log(err))
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigateByUrl('home')
      this.loggedIn = false
      this.userStatusChange.next('logout')
    })
      .catch(err => console.log(err))
  }
}
