import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = AppConfig.baseUrl + "order";

  getAllOrders(): Observable<Order[]>{
    const getAllOrdersUrl = this.baseUrl + "/getAll";
    return this.httpClient.get<Map<String, any>>(getAllOrdersUrl).pipe(
        map(response => {
          console.log(response);
          throw new Error("Check this");
      })
    );
}

  getUserOrders(username: String):  Observable<Order[]>{
    const getUserOrdersUrl = this.baseUrl + `/getByUsername/${username}`;
    return this.httpClient.get<Map<String, any>>(getUserOrdersUrl).pipe(
        map(response => {
          console.log(response);
          throw new Error("Check this");
      })
    );
  }

  placeOrder(order: Order){
    const addUrl = this.baseUrl + "/add";
    return this.httpClient.post<Map<String, any>>(
      addUrl, 
      {
        username: order.buyerUsername,
        address: order.buyerAddress,
        total: order.total,
        items: order.items,
      }
      ).pipe(
      map(response => {
          console.log(response);
          throw new Error("Check this");
      })
  );
  }

 


}
