import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UrlParamsService } from 'src/app/services/url-params.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthComponent } from '../auth/auth.component';
import { DepartmentsComponent } from '../departments/departments.component';
import { User } from 'src/app/models/user';

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

  expand: boolean = false; //controls the header expansion
  categorySelected:string|null ='' //controls the header title
  items$:Observable<number>|null = null; //Observable to keep track of cart length
  items:number = 0; //Variable modfied by the subscription to the cart length observable
  count = new Subscription(); // subscription that updates the items variable and is destroyed on component destruction
  user: User | null = null;
  userId: string | null = null;

  constructor(
    private paramService:UrlParamsService,
    private cartService:CartService,
    private mDialog:MatDialog,
    private firebaseService: FirebaseService

  ) { }


   

  ngOnInit(): void {
    this.getCategory();
    this.items$ = this.cartService.getItems();
    this.count = this.cartService.getItems().subscribe((items)=>{
      this.items = items;
    })
    this.logStatus();
    this.currentUser();
  }

  openCart(){
    this.mDialog.open(CartComponent,{ 
      width: '400px',
      height: '600px',
      backdropClass: 'backdrop'
  });
  }

  openHamburger() {
    // opens the hamburger menu
    this.mDialog.open(DepartmentsComponent, {
      width: '100vw',
      height: '100vh',
      backdropClass: 'backdrop',
    });
  }

  openLogin() {
    // opens the login dialog
    this.mDialog.open(AuthComponent, {
      width: '400px',
      height: '600px',
      backdropClass: 'backdrop',
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

  logStatus() {
    //checks if the user is logged in
    this.firebaseService.currentUser$.subscribe((userID) => {
      console.log(userID);
      this.userId = userID;
      userID ? true : false;
    });
  }

  currentUser() {
    //gets the current logged in user
    this.firebaseService.user$.subscribe((user) => {
      this.user = user;
      console.log(user?.photoURL)
    });
  }

  signOut() {
    //signs out the user
    this.firebaseService.signOut();
    /* this.user = null; */
  }
      

}

    
  

  
      

    

  

 


