import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Product[] = [];
  cart$ = of(this.cart);
  itemsInCart =  new BehaviorSubject<number>(0);
  items$ = this.itemsInCart.asObservable();
  constructor() { }

  addToCart(product: Product,quantity: number) {
    const cartProduct = {
      ...product,
      quantity
    }
    this.cart.push(cartProduct);
    this.itemsInCart.next(this.cart.length);
  }

  getCart() {
    return this.cart$;
  }

  getItems() {
    return this.items$;
  }

  getTotal() {
   return this.cart.map(item => item.quantity!==undefined?item.price * item.quantity:0).reduce((a,b) => a+b);
  }

  
}
