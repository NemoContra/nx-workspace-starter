import { Component, inject, Renderer2 } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';

const getBody = () => inject<Window>(WINDOW).document.body;

@Component({
  selector: 'flight-navbar',
  templateUrl: 'navbar.component.html',
  standalone: true,
})
export class NavbarComponent {
  private sidebarVisible = false;

  private body = getBody();
  private renderer = inject(Renderer2);

  sidebarToggle(): void {
    if (this.sidebarVisible) {
      this.sidebarVisible = false;
      this.renderer.removeClass(this.body, 'nav-open');
      return;
    }

    this.renderer.addClass(this.body, 'nav-open');
    this.sidebarVisible = true;
  }
}
