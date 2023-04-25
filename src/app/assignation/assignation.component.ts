import { Component, ViewChild, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../config';

export interface Route {
  routeId: string;
  driverId: string;
  productsToDeliver: {
    orderId: string
  }[];

}

export interface Driver {
  driverId: string;
  driverName: string;
  initialLocation: {
    latitude: number;
    longitude: number;
  }
}
@Component({
  selector: 'app-assignation',
  templateUrl: './assignation.component.html',
  styleUrls: ['./assignation.component.scss']
})


export class AssignationComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    this.accordion = new MatAccordion();
  }
  isExpanded = true
  disabled = false;
  openedPanelIndex: number = -1;
  riders: Array<Driver> = []
  routes_api: Route[] = [];
  /* rutas en duro para testing */
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

/* HTTP REQ */
  postInformation() {
    const url = `${API_ENDPOINT}/route-updated`
    let data = this.routes_api
    this.http.post(url, data).subscribe(response => {
    }, error => {
      console.error('Error:', error.status)
      if (error.status === 500) {
        this.showErrorMessage('Error código 500, repitiendo request')
        this.postInformation()
        } else if (error.status === 400) {
        this.showErrorMessage('Error código 400')
      }
    });
  }
  fetchRiders() {
    const url = `${API_ENDPOINT}/riders`
    this.http.get<Driver[]>(url).subscribe(data => {
      this.riders = data
        ;
    },
    (error) => {
      this.showErrorMessage('Error solicitando datos')
      console.error(error);    });
  }
  async fetchRoutes() {
    const url = `${API_ENDPOINT}/optimized-routes`
    await this.http.get<Route[]>(url).subscribe(data => {
      this.routes_api = data
        ;
    },
      (error) => {
        this.showErrorMessage('Error solicitando datos')
        console.error(error);
      });
  }

  async resetChanges() {
    await this.fetchRoutes()
    localStorage.removeItem('routes')

  }

/* SUCCESS AND ERRROR MSGS */
  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }

  showSuccessMessage(newRoute: string) {
    this.snackBar.open(`El producto se ha cambiado a la ruta ${newRoute}`, 'Cerrar', {
      duration: 5000,
      panelClass: 'success-snackbar',
    });
  }

/* CAMBIAR PRODUCTO DE RUTA */
  handleChangeRoute(routes: Array<string>, option: string = '') {
    let actualRoute = routes[0]
    let newRoute = routes[1]
    let productId = routes[2]

    let routes_array = option === 'test' ? this.routes_hard : this.routes_api
    /* EVITA CAMBIAR PRODUCTOS SIN RUTA */
    if (newRoute) {
      let originRoute = routes_array.find(el => el.routeId === actualRoute)
      let index = originRoute?.productsToDeliver.findIndex(el => el.orderId == productId) as number
      originRoute?.productsToDeliver.splice(index, 1)
      let newRouteTarget = routes_array.find(el => el.routeId === newRoute)
      newRouteTarget?.productsToDeliver.push({ 'orderId': productId })
      this.openedPanelIndex = routes_array.findIndex(route => route.routeId === actualRoute);
      /* ACTUALIZA EL LOCALSTORAGE AL CAMBIAR UN PRODUCTO DE RUTA */
      localStorage.setItem('routes', JSON.stringify(routes_array));
      this.showSuccessMessage(newRoute)
    } else {
      this.showErrorMessage('La nueva ruta está vacía')
    }

  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded
    if (!this.isExpanded) {
      this.accordion.closeAll()
    } else {
      this.accordion.openAll()
    }
  }
  getRiderName(driverId: string) {
    return this.riders.find(el => el.driverId === driverId)?.driverName
  }

  ngOnInit() {
    /* AL INICIAR TOMA DATOS DE LOCALSTORAGE, SI NO HAY, HACE UNA REQUEST */
    const storedRoutes = localStorage.getItem('routes');
    this.fetchRiders()
    if (storedRoutes) {
      this.routes_api = JSON.parse(storedRoutes);
    } else {
      this.fetchRoutes()
    }
  }
}
