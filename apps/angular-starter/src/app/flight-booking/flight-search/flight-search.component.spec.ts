import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlightBookingModule } from '../flight-booking.module';
import { FlightSearchComponent } from './flight-search.component';
import { Flight } from '@flight-app/shared';
import { FlightService } from './flight.service';
import { By } from '@angular/platform-browser';

const result = [
  {id: 17, from: 'Graz', to: 'Hamburg', date: 'now', delayed: true},
  {id: 18, from: 'Vienna', to: 'Barcelona', date: 'now', delayed: true},
  {id: 19, from: 'Frankfurt', to: 'Salzburg', date: 'now', delayed: true}
];

const flightServiceMock = {
  find(from: string, to: string): Observable<Flight[]> {
    return of(result);
  },
  // Die nachfolgenden beiden Member werden nur in bestimmten
  // Scenarien benötigt
  flights: [],
  load(from: string, to: string): void {
    this.find(from, to).subscribe(f => {
      this.flights = f;
    });
  }
};

describe('flight-search.component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule, FlightBookingModule
      ],
      providers: [
        // Fügen Sie hier eventuelle Provider aus
        // Ihrer app.module.ts ein (falls vorhanden)
      ]
    }).overrideComponent(FlightSearchComponent, {
      set: {
        providers: [
          {
            provide: FlightService,
            useValue: flightServiceMock
            // bzw. provide: AbstractFlightService
            // je nach ihrem Vorgehen
          }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
  }));

  it('should not have any flights loaded initially', () => {
    expect(component.flights.length).toBe(0);
  });

  it('should not load flights w/o from and to', () => {
    component.from = '';
    component.to = '';
    component.search();

    expect(component.flights.length).toBe(0);
  });

  it('should load flights w/ from and to', () => {
    component.from = 'Hamburg';
    component.to = 'Graz';
    component.search();

    expect(component.flights.length).toBe(3);
  });

  it('should have a disabled search button w/o params', () => {

    // Intial Databinding, ngOnInit
    fixture.detectChanges();

    // Get input field for from
    const from = fixture
      .debugElement
      .query(By.css('input[name=from]'))
      .nativeElement;

    from.value = '';
    from.dispatchEvent(new Event('input'));

    // Get input field for to

    const to = fixture
      .debugElement
      .query(By.css('input[name=to]'))
      .nativeElement;

    to.value = '';
    to.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // get disabled
    const disabled = fixture
      .debugElement
      .query(By.css('button'))
      .properties['disabled'];

    expect(disabled).toBeTruthy();

  });

});

