import { createComponentFactory } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [provideRouter([])],
  });

  it('should render', () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });
});
