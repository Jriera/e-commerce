import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UrlParamsService } from 'src/app/services/url-params.service';
import { UserHttpService } from 'src/app/services/user-http.service';
import { AuthComponent } from '../auth/auth.component';
import { CartComponent } from '../cart/cart.component';
import { DepartmentsComponent } from '../departments/departments.component';

@Component({
  selector: 'app-basic-nav',
  templateUrl: './basic-nav.component.html',
  styleUrls: ['./basic-nav.component.scss'],
})
export class BasicNavComponent implements OnInit {
  expand: boolean = false; //controls the header expansion
  categorySelected: string | null = ''; //controls the header title
  items$: Observable<number> | null = null; //Observable to keep track of cart length
  items: number = 0; //Variable modfied by the subscription to the cart length observable
  count = new Subscription(); // subscription that updates the items variable and is destroyed on component destruction
  user: User | null = null;
  userId: string | null = null;
  admin:boolean = false;

  constructor(
    private paramService: UrlParamsService,
    private cartService: CartService,
    private mDialog: MatDialog,
    private firebaseService: FirebaseService,
    private uHttp: UserHttpService
  ) {

  }


  ngOnInit(): void {
    this.getCategory();
    this.items$ = this.cartService.getItems();
    this.count = this.cartService.getItems().subscribe((items) => {
      this.items = items;
    });
    this.logStatus();
    this.currentUser();
    this.adminStatus();
    
  }

  openCart() {
    // opens the cart dialog
    this.mDialog.open(CartComponent, {
      width: '400px',
      height: '600px',
      backdropClass: 'backdrop',
    });
  }

  openHamburger() {
    // opens the hamburger menu
    this.mDialog.open(DepartmentsComponent, {
      width: '100vw',
      height: '100vh',
      backdropClass: 'backdrop',
    });
  }

  openLogin() {
    // opens the login dialog
    this.mDialog.open(AuthComponent, {
      width: '400px',
      height: '600px',
      backdropClass: 'backdrop',
    });
  }

  getCategory() {
    //gets the category from the url
    this.paramService.get().subscribe((params) => {
      this.categorySelected = params;
    });
  }

  expander() {
    //toggles the header expansion
    this.expand = !this.expand;
  }

  ngOnDestroy() {
    this.count.unsubscribe();
  }

  logStatus() {
    //checks if the user is logged in
    this.firebaseService.currentUser$.subscribe((userID) => {
      console.log(userID);
      this.userId = userID;
      userID ? this.uHttp.isAdmin(userID) : false;
      
    });
  }

  currentUser() {
    //gets the current logged in user
    this.firebaseService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  signOut() {
    //signs out the user
    this.firebaseService.signOut();
    /* this.user = null; */
  }

  adminStatus() {
    
    this.uHttp.admin$.subscribe(admin => {
      this.admin = admin;
    });
  }
}
