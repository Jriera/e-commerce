import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UrlParamsService } from 'src/app/services/url-params.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-basic-nav',
  templateUrl: './basic-nav.component.html',
  styleUrls: ['./basic-nav.component.scss']
})
export class BasicNavComponent implements OnInit {

  expand: boolean = false; //controls the header expansion
  categorySelected:string|null ='' //controls the header title
  items$:Observable<number>|null = null; //Observable to keep track of cart length
  items:number = 0; //Variable modfied by the subscription to the cart length observable
  count = new Subscription(); // subscription that updates the items variable and is destroyed on component destruction

  constructor(
    private paramService:UrlParamsService,
    private cartService:CartService,
    private mDialog:MatDialog
  ) { }


   

  ngOnInit(): void {
    this.getCategory();
    this.items$ = this.cartService.getItems();
    this.count = this.cartService.getItems().subscribe((items)=>{
      this.items = items;
    })
  }

  openCart(){
    this.mDialog.open(CartComponent,{ 
      width: '400px',
      height: '600px',
      backdropClass: 'backdrop'
  });
  }
    

    

  getCategory(){
    this.paramService.get().subscribe((params)=>{
      this.categorySelected = params
    })
  }

 
 



  //following are the methods for animations
  expander(){
   this.expand=!this.expand;
  }

  ngOnDestroy(){
    this.count.unsubscribe();
  }

}
