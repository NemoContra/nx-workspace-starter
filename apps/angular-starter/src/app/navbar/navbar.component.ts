import { Component, OnInit, Renderer2, ViewChild, ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  private sidebarVisible = false;

  sidebarToggle() {
    const body = this.document.body;

    if (this.sidebarVisible === false) {
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
}
