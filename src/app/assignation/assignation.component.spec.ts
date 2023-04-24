import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ProductComponent } from '../product/product.component';

import { AssignationComponent } from './assignation.component';

describe('AssignationComponent', () => {
  let component: AssignationComponent;
  let fixture: ComponentFixture<AssignationComponent>;
  let mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignationComponent, ProductComponent],
      imports: [MatCardModule, MatSnackBarModule, MatExpansionModule, MatListModule, BrowserAnimationsModule],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AssignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should move product to new route on changeRoute event', () => {
    const product = component.routes_hard[0].productsToDeliver[0];
    const originalRoute = component.routes_hard[0];
    component.handleChangeRoute([originalRoute.routeId, '2', product.orderId]);
    expect(component.routes_hard[1].productsToDeliver.length).toBe(4)
    expect(mockSnackBar.open).toHaveBeenCalledWith('El producto se ha cambiado a la ruta 2', 'Cerrar', jasmine.any(Object));


  });
  it('should not allow to move a product new route empty', () => {
    const product = component.routes_hard[0].productsToDeliver[0];
    const originalRoute = component.routes_hard[0];
    component.handleChangeRoute([originalRoute.routeId, '', product.orderId]);
    expect(mockSnackBar.open).toHaveBeenCalledWith('La nueva ruta está vacía', 'Cerrar', jasmine.any(Object));

  });

});
