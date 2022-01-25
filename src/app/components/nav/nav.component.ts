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
    this.getCategory(); //gets the category from the url to display in the header
    this.items$ = this.cartService.getItems(); //updates the items inside the cart
    this.count = this.cartService.getItems().subscribe((items)=>{ //displays number of elements in the cart
      this.items = items;
    })
    this.logStatus();
    this.currentUser();
  }

  openCart(){ //opens the cart copmonent as a modal
    this.mDialog.open(CartComponent,{ 
      width: '400px',
      height: '600px',
      backdropClass: 'backdrop'
  });
  }

  openHamburger() { //opens the departments component as a modal 
    // opens the hamburger menu
    this.mDialog.open(DepartmentsComponent, {
      width: '100vw',
      height: '100vh',
      backdropClass: 'backdrop',
    });
  }

  openLogin() { //opens the login component as a modal
    // opens the login dialog
    this.mDialog.open(AuthComponent, {
      width: '400px',
      height: '600px',
      backdropClass: 'backdrop',
    });
  }
    

    

  getCategory(){ //captures the category from the url and this result is later used to set the categorySelected variable
    this.paramService.get().subscribe((params)=>{
      this.categorySelected = params
    })
  }

 
 



  
  expander(){ //toggles a state change via the expand variable
   this.expand=!this.expand;
  }

  ngOnDestroy(){ //destroys the count subscription on destruction of the component
    this.count.unsubscribe();
  }

  logStatus() {
    //checks if the user is logged in by evaluating if a user ID exists
    this.firebaseService.currentUser$.subscribe((userID) => {
      console.log(userID);
      this.userId = userID;
      userID ? true : false;
    });
  }

  currentUser() {
    //ssubscribes to the current user observable and sets the user variable to the current user
    this.firebaseService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  signOut() {
    //signs out the user
    this.firebaseService.signOut();
    
  }
      

}

    
  

  
      

    

  

 


