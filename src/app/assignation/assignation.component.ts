import { Component } from '@angular/core';

@Component({
  selector: 'app-assignation',
  templateUrl: './assignation.component.html',
  styleUrls: ['./assignation.component.scss']
})
export class AssignationComponent {


  routes_hard = [
    {
      "routeId": "1",
      "driverId": "1",
      "productsToDeliver": [
        {
          "orderId": "1"
        },
        {
          "orderId": "2"
        },
        {
          "orderId": "3"
        }
      ]
    },
    {
      "routeId": "2",
      "driverId": "3",
      "productsToDeliver": [
        {
          "orderId": "7"
        },
        {
          "orderId": "9"
        },
        {
          "orderId": "8"
        }
      ]
    },
    {
      "routeId": "3",
      "driverId": "2",
      "productsToDeliver": [
        {
          "orderId": "6"
        },
        {
          "orderId": "4"
        },
        {
          "orderId": "5"
        }
      ]
    }
  ]
}
