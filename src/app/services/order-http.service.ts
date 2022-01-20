import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHttpService {

  constructor(private http:HttpClient) { }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>('https://nest-commerce-api.herokuapp.com/orders');
  }

  getOrdersByUserId(userId:string):Observable<Order[]>{
    return this.http.get<Order[]>(`https://nest-commerce-api.herokuapp.com/orders/by-user?userId=${userId}`);
  }

  saveOrder(order:Order){
    
    return this.http.post('https://nest-commerce-api.herokuapp.com/orders',{
      "cart":order.cart,
      "totalPrice":order.totalPrice,
      "orderDate":order.orderDate.toDateString(),
      "userId":order.userId,
      "orderStatus":order.orderStatus

  });
}

}
