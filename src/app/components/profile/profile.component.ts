import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';
import { FirebaseService } from 'src/app/services/firebase.service';
import { OrderHttpService } from 'src/app/services/order-http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userOrders: Order[] = [];
  ordersSub: Subscription = new Subscription();

  constructor(private fb: FirebaseService, private oHttp: OrderHttpService) {}

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.getOrders();
    if (this.userOrders.length > 0) {
      this.ordersSub.unsubscribe();
    }
  }

  getOrders() {
    if (this.fb.currentUserUID) {
      this.ordersSub = this.oHttp
        .getOrdersByUserId(this.fb.currentUserUID)
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
