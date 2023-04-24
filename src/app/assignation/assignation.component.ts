import { Component, ViewChild, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-assignation',
  templateUrl: './assignation.component.html',
  styleUrls: ['./assignation.component.scss']
})
export class AssignationComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor() {
    this.accordion = new MatAccordion();
  }
  displayMode: string = 'default';
  multi = false;
  hideToggle = false;
  disabled = false;
  showPanel3 = true;
/*   expandedHeight: string;
  collapsedHeight: string; */
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  panelOpenState = false;
  openedPanelIndex: number = -1;

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

  handleChangeRoute(routes: Array<string>) {
    let actualRoute = routes[0]
    let newRoute = routes[1]
    let productId = routes[2]

    let originRoute = this.routes_hard.find(el => el.routeId === actualRoute)
    let index = originRoute?.productsToDeliver.findIndex(el => el.orderId == productId) as number
    originRoute?.productsToDeliver.splice(index, 1)
    let newRouteTarget = this.routes_hard.find(el => el.routeId === newRoute)
    newRouteTarget?.productsToDeliver.push({ 'orderId': productId })
    this.openedPanelIndex = this.routes_hard.findIndex(route => route.routeId === actualRoute);

  }

  handleExpand(index: number) {
    return true
  }
  test() {
    this.accordion.openAll()
  }




}
