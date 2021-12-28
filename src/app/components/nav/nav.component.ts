import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UrlParamsService } from 'src/app/services/url-params.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations:[
    trigger('expandContract',[
      transition('* => *',[
        style({ height: '0px' }),
        animate('0.8s ease-in'),
        query('@fadeIn',animateChild())
      ])
    ]),
      
    trigger('fadeIn',[
      transition('*=>*',[
        style({ opacity: 0 }),
        animate('1s ease-in')
      ]),
    ])
  ]
})
export class NavComponent implements OnInit {

  expand: boolean = false;
  categorySelected:string|null =''
  items$:Observable<number>|null = null;
  items:number = 0;
  count = new Subscription();
  constructor(
    private paramService:UrlParamsService,
    private cartService:CartService
  ) { }

   

  ngOnInit(): void {
    this.getCategory();
    this.items$ = this.cartService.getItems();
    this.count = this.cartService.getItems().subscribe((items)=>{
      this.items = items;
    })
    

    
  }

  getCategory(){
    this.paramService.get().subscribe((params)=>{
      this.categorySelected = params
    })
  }

  getItems(){
    
  }
 



  //following are the methods for animations
  expander(){
   this.expand=!this.expand;
  }

  ngOnDestroy(){
    this.count.unsubscribe();
  }
      

}

    
  

  
      

    

  

 


