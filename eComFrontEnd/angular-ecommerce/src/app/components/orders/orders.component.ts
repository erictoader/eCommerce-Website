import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orders : Order[] = [];
  constructor(private ordersService: OrdersService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.ordersService.getAllOrders().subscribe(
        response =>{
          this.orders = response;
      });
    }

}
