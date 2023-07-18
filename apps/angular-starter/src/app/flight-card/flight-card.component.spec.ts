import { FlightCardComponent } from './flight-card.component';
import { MatDialog } from '@angular/material/dialog';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { Flight } from '@flight-app/shared';
import { FlightEditComponent } from '../flight-edit/flight-edit.component';

const mockFlight: Flight = {
  from: 'Hamburg',
  to: 'Rankweil',
  date: '2023-07-20',
  delayed: false,
  id: 1,
};

describe('FlightCardComponent', () => {
  const createComponent = createComponentFactory({
    component: FlightCardComponent,
    providers: [MatDialog],
  });
  let spectator: Spectator<FlightCardComponent>;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        item: mockFlight,
      },
    });
  });

  it('should render', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should open a dialog if edit button is clicked', () => {
    const dialog = spectator.inject(MatDialog);
    jest.spyOn(dialog, 'open');

    expect(spectator.query(byTestId('edit-button'))).toBeTruthy();
    spectator.click(byTestId('edit-button'));

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(FlightEditComponent, {
      data: {
        flight: mockFlight,
      },
      minWidth: '80%',
    });
  });

  it('should select a flight', () => {
    const spyObserver = {
      next: jest.fn(),
      error: jest.fn(),
    };

    spectator.output('selectedChange').subscribe(spyObserver);

    spectator.click(byTestId('select-button'));
    expect(spectator.fixture).toMatchSnapshot();

    expect(spyObserver.next).toHaveBeenCalledTimes(1);
    expect(spyObserver.next).toHaveBeenCalledWith(true);
  });

  it('should deselect a flight', () => {
    const spyObserver = {
      next: jest.fn(),
      error: jest.fn(),
    };

    spectator.output('selectedChange').subscribe(spyObserver);

    spectator.click(byTestId('select-button'));
    spectator.click(byTestId('deselect-button'));

    expect(spyObserver.next).toHaveBeenCalledTimes(2);
    expect(spyObserver.next).toHaveBeenNthCalledWith(1, true);
    expect(spyObserver.next).toHaveBeenNthCalledWith(2, false);
  });
});
