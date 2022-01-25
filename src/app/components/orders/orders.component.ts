import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { FirebaseService } from 'src/app/services/firebase.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { UserHttpService } from 'src/app/services/user-http.service';


@Component({
  selector: 'app-orders-display',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @Input() userOrders:Order[] = [];
  admin:boolean = false;
  constructor(private oHttp:OrderHttpService, private uHttp:UserHttpService,private fb:FirebaseService) { }

  ngOnInit(): void {
    this.adminStatus();
  }

  deleteOrder(order:Order){
    this.userOrders = this.userOrders.filter(o => o.id !== order.id);
    try{
      order.id?this.oHttp.deleteOrder(order.id).subscribe(()=>console.log('order deleted')):console.log('order id is null');
    } catch(e){
      console.log(e);
    }
    
    console.log(order.id);

  }

  updateOrder(order:Order){
    
    order.orderStatus = 'Completed';
    this.oHttp.updateOrdeStatus(order).subscribe(()=>console.log('order updated'));
  }

  adminStatus(){
    this.uHttp.admin$.subscribe(admin=>{
      this.admin = admin;
    });
  }

}
