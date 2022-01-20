import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';
import { FirebaseService } from 'src/app/services/firebase.service';
import { OrderHttpService } from 'src/app/services/order-http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  ordersSub:Subscription = new Subscription();
  userOrders:Order[] = [];

  constructor(private oHttp:OrderHttpService,private fb:FirebaseService) { }

  ngOnInit(): void {
  }

  getOrders() {
    if (this.fb.currentUserUID) {
      this.ordersSub = this.oHttp
        .getOrders()
        .subscribe((orders) => {
          this.userOrders = orders; //we get the orders from the DB
          this.userOrders.forEach((order) => {
            //the orders cart returned is in form of json with keys so we need to operate on each one of them
            const keys = Object.keys(order.cart); //we create an iterable from the keys of the cart JSON
            const cart: any[] = [];
            keys.forEach((key) => {
              cart.push(order.cart[Number(key)]); //for each key we push the value pair of the JSON cart to the cart array
            });
            order.cart = cart; // we assign the cart array to the cart of the order, this way we can use it in the template
          });
        });
    }
  }

}
