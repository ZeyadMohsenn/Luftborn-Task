import { Component, ElementRef, inject } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-sidebar',
  template: ` <app-menu></app-menu> `,
})
export class AppSidebarComponent {
  el = inject(ElementRef);
}
