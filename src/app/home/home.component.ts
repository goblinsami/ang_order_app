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
  orders_hard = [
    {
      "orderId": "1",
      "productName": "Tuercas",
      "price": 1.50,
      "deliveryLocation": {
        "latitude": 41.400346647898395,
        "longitude": 2.1675147243502524
      }
    },
    {
      "orderId": "2",
      "productName": "Conectores Ethernet",
      "price": 5.00,
      "deliveryLocation": {
        "latitude": 41.384102849621655,
        "longitude": 2.174398496434488
      }
    },
    {
      "orderId": "3",
      "productName": "Ordenador",
      "price": 1230.00,
      "deliveryLocation": {
        "latitude": 41.44004851197962,
        "longitude": 2.1908819154470143
      }
    },
    {
      "orderId": "4",
      "productName": "Commercial displays",
      "price": 89000.00,
      "deliveryLocation": {
        "latitude": 47.63284130847643,
        "longitude": -122.35202055409594
      }
    },
    {
      "orderId": "5",
      "productName": "Boat locator devices",
      "price": 1500.00,
      "deliveryLocation": {
        "latitude": 47.63321329217723,
        "longitude": -122.32828747051735
      }
    },
    {
      "orderId": "6",
      "productName": "Security Cameras",
      "price": 600.00,
      "deliveryLocation": {
        "latitude": 47.66661284145498,
        "longitude": -122.29296517635987
      }
    },
    {
      "orderId": "7",
      "productName": "Security camera storage",
      "price": 1900000.00,
      "deliveryLocation": {
        "latitude": 55.79458717099645,
        "longitude": 37.56862514353878
      }
    },
    {
      "orderId": "8",
      "productName": "Radio transmitters",
      "price": 15000.00,
      "deliveryLocation": {
        "latitude": 55.822373834197435,
        "longitude": 37.64686396716849
      }
    },
    {
      "orderId": "9",
      "productName": "Cash registers",
      "price": 200000.00,
      "deliveryLocation": {
        "latitude": 55.7906849757898,
        "longitude": 37.5581788122349
      }
    }
  ];

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
