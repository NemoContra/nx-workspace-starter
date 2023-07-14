import { SidebarComponent } from './sidebar.component';
import { MountConfig } from 'cypress/angular';

describe(SidebarComponent.name, () => {
  const config: MountConfig<SidebarComponent> = {};

  it('should render', () => {
    cy.mount(SidebarComponent, { ...config });
  });
});
