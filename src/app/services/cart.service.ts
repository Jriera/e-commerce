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

  addQuantity(product: Product) {
    this.cart.forEach(item => {
      if (item.id === product.id) {
        item.quantity!==undefined?item.quantity++:item.quantity=1;
      }
    });
  }
  removeQuantity(product: Product) {
    this.cart.forEach(item => {
      if (item.id === product.id) {
        if(item.quantity!==undefined){
          item.quantity--;
          if(item.quantity===0){
            this.removeItem(product);
          }
        }
      }
    });
  }
  removeItem(product: Product) {
    this.cart = this.cart.filter(item => item.id !== product.id);
   this.cart$=of(this.cart);
    this.itemsInCart.next(this.cart.length);
  }
}
            
            



  
