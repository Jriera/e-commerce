import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems$:Observable<Product[]> | null = null
  cartItems:Product[] = [];
  cartTotal:number = 0;

  constructor(private cartService:CartService) { }

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
    this.showItems();
    this.cartItems.length===0?this.cartTotal=0:this.getTotal();
  }
}
   
   






