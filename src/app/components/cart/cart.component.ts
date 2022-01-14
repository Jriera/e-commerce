import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems$:Observable<Product[]> | null = null
  cartItems:Product[] = [];
  cartTotal:number = 0;

  @Input() formValidity = 'false';

  constructor(
              private cartService:CartService,  
              private mDialog:MatDialog,
              private router:Router,
              private fbService:FirebaseService
              ) { }
           

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCart();
    this.showItems();
    this.getTotal();
  }

  showItems(){
    this.cartItems$?.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal(){
    this.cartTotal=this.cartService.getTotal();
  }

  addQuantity(product: Product){
    this.cartService.addQuantity(product);
    this.getTotal();
  }

  removeQuantity(product: Product){
    this.cartService.removeQuantity(product);
    this.cartItems$ = this.cartService.getCart();
    this.showItems();
    this.cartItems.length===0?this.cartTotal=0:this.getTotal();
  }

  closeDialog(){
    this.mDialog.closeAll();
  }
  isCheckoutRoute() {
    if(this.router.url === '/checkout' ){
    return true;
    } else{
      return false;
    }
    
  }

  insertOrder(userUID:string|null,order:Order){
    this.fbService.addOrder(userUID,order);
  }

  checkout(){
    this.router.navigate(['/profile']);
    const order:Order = {
      date: new Date(),
      cart: [...this.cartItems],
      total: this.cartTotal,
      userUid:this.fbService.currentUserUID,
      status: 'pending'
    }
    this.insertOrder(this.fbService.currentUserUID,order);
    console.log(order);

  }
}
   
   






