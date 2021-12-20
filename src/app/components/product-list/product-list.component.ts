import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { UrlParamsService } from 'src/app/services/url-params.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
}) //end of component decorator
export class ProductListComponent implements OnInit, OnDestroy {
  productList: Product[] = [];
  prductsSubscription = new Subscription();
  categorySelected: string = 'electronics';
  expand: boolean = false;

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private paramService: UrlParamsService
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  ngOnDestroy(): void {
    this.prductsSubscription.unsubscribe();
  }

  
  getCategory() {// gets params from url 
    this.activatedRoute.params.subscribe((params) => {
      this.categorySelected = params['category'];//sets the params to the categorySelected
      this.paramService.set(this.categorySelected);//sets the params to the urlParamsService

      this.productList = [];//clears the productList
      this.getProductsList(this.categorySelected);
    });
  }


//following are the methods for requests to the API
  getProductsList(category: string): void {
    if (category === 'clothing') {
      const menClothing = this.http.getMenClothingProducts().pipe();
      const womenClothing = this.http.getWomenClothingProducts().pipe();
      const result = forkJoin(menClothing, womenClothing);
      result.subscribe((data) => {
        this.productList = data[0].concat(data[1]);
      });
    } else {
      this.prductsSubscription = this.http
        .getProductsByCategory(category)
        .subscribe((data) => {
          this.productList = data;
        });
    }
  }
}
