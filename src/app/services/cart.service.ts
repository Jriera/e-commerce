import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
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

  addToCart(product: Product) {
    this.cart.push(product);
    this.itemsInCart.next(this.cart.length);
  }

  getCart() {
    return this.cart$;
  }

  getItems() {
    return this.items$;
  }

  
}
