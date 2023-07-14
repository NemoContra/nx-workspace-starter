import { createComponentFactory } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const createComponent = createComponentFactory(AppComponent);

  it('should render', () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });
});
