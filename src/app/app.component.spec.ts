import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AssignationComponent } from './assignation/assignation.component';
import { HomeComponent } from './home/home.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'assignation', component: AppComponent },
          { path: 'home', component: AppComponent }

        ])
      ],
      declarations: [
        AppComponent,
        AssignationComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to Assignation component on button click', fakeAsync(() => {
    spyOn(router, 'navigate');
    const button = fixture.nativeElement.querySelector('#assignation_btn');
    button.click();
    tick();
    expect(router.url).toEqual('/assignation');
  }));
  it('should navigate to Home component on button click', fakeAsync(() => {
    spyOn(router, 'navigate');
    const button = fixture.nativeElement.querySelector('#home_btn');
    button.click();
    tick();
    expect(router.url).toEqual('/home');
  }));
});
