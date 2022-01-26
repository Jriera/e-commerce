import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { UserHttpService } from 'src/app/services/user-http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems$: Observable<Product[]> | null = null;
  cartItems: Product[] = [];
  cartTotal: number = 0;

  @Input() formValidity = 'false'; //keeps track of the valididy of the checkout form
  @Input() email: string = ''; //coming from the checkout form used in signup
  @Input() password: string = ''; //coming from the checkout form used in signup
  @Input() name: string = ''; // coming from the checkout form used in user creation

  constructor(
    private cartService: CartService,
    private mDialog: MatDialog,
    private router: Router,
    private fbService: FirebaseService,
    private oHttpService: OrderHttpService,
    private uHttpService: UserHttpService
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCart();
    this.showItems(); 
    this.getTotal();
  }

  showItems() {
    this.cartItems$?.subscribe((items) => {
      this.cartItems = items; //displays the items in the cart and keeps updated via observable
    });
  }

  getTotal() {
    this.cartTotal = this.cartService.getTotal(); //displays the total price of the cart
  }

  addQuantity(product: Product) {
    this.cartService.addQuantity(product); //adds up the product quantity
    this.getTotal();
  }

  removeQuantity(product: Product) {
    this.cartService.removeQuantity(product); //removes the product quantity
    this.cartItems$ = this.cartService.getCart();//updates the cart items
    this.showItems();//updates the view
    this.cartItems.length === 0 ? (this.cartTotal = 0) : this.getTotal(); //updates the total price
  }

  closeDialog() {
    this.mDialog.closeAll();//closes the modal
  }
  isCheckoutRoute() { //route check - TODO: move to a service
    if (this.router.url === '/checkout') {
      return true;
    } else {
      return false;
    }
  }

  insertOrder(order: Order) {
    try {
      this.oHttpService.saveOrder(order).subscribe((data) => {
        console.log(data);//creates an order from the cart
      });
      this.cartService.clearCart();//cleares the cart once the order is created
    } catch (error) {
      console.log(error);
    }
  }

  insertUser(user: User) {
    try {
      this.uHttpService.saveUser(user).subscribe((data) => {
        console.log(data);//creates a user from the checkout form
      });
    } catch (error) {
      console.log(error);
    }
  }

  checkout() {
    this.router.navigate(['/profile']);
    const order: Order = { //defines the new order from the cart components
      orderDate: new Date(),
      cart: { ...this.cartItems },
      totalPrice: this.cartTotal,
      userId: this.fbService.currentUserUID,
      orderStatus: 'pending',
    };

    this.fbService.currentUserUID
      ? null
      : this.fbService.emailSignUp(this.email, this.password);//creates the user if the user does not exist

    this.fbService.user$.subscribe((user) => {
      if (user) {
        const userObj: User = {//creates a user object to save to DB
          uid: user.uid,
          email: user.email,
          displayName: this.name,
          photoURL: '',
          admin: false,
        };
        this.insertUser(userObj);//stores the user in the DB
        order.userId = user.uid;//sets the order userId to the current user ID
        this.insertOrder(order);//stores the order in the DB
      }
    });

    console.log(order.cart);
  }
}
