import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Product } from '../../models/product';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productId: number = this.getProductId();
  productDetail: Product | null = null;
  recommended: Product[] = [];
  quantity: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private location: Location,
    private router: Router,
    private cartService: CartService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //this is to prevent the router from reusing the route and forcing it to reload the page when params change
     
  }

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetail(this.productId);
    this.getRelatedProducts(3, this.productId);
  }

  getProductId() {
    return this.activatedRoute.snapshot.params['id'];
  }

  getProductDetail(id: number) {
    this.http.getProduct(id).subscribe((data) => {
      this.productDetail = data;
    });
  }

  getRelatedProducts(amount: number, reference: number) {
    const index: number = Number(reference); //apparently reference is treated as string even with type number
    for (let i = 1; i <= amount; i++) {
      let iteration: number = index + i;
      if (iteration > 20) {
        //if the product id is greater than 20, it will be reset to 1 to get the first product
        iteration = iteration - 20;
      }

      this.http.getProduct(iteration).subscribe((data) => {
        this.recommended.push(data);
      });
    }
  }

  goBack() {
    this.location.back();
  }

  increaseQuantity() {
    this.quantity++;
  }

  reduceQuantity() {
    this.quantity > 1 ? this.quantity-- : this.quantity;
  }

  addToCart(product:Product,quantity:number) {
    this.cartService.addToCart(product,quantity);
    this.cartService.getCart().subscribe((data) => {
      console.log(data);
    });

  } 


}
