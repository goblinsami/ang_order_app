import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../config';

export interface Order {
  orderId: string;
  productName: string;
  price: number;
  deliveryLocation: {
    latitude: number;
    longitude: number;
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {
  displayedColumns: string[] = ['orderId', 'name', 'price', 'location'];
  constructor(private http: HttpClient) { }
  orders_api: Order[] = [];

  fetchOrders() {
    const url = `${API_ENDPOINT}/orders`
    this.http.get<Order[]>(url).subscribe(
      (data) => {
        this.orders_api = data;
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }
  ngOnInit(): void {
    this.fetchOrders()
  }
}
