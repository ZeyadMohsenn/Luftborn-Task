import { style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [ButtonModule, RouterLink,CommonModule],
  template: `  <button
  pButton
  pRipple
  class="transparentButton"
  [ngClass]="class"
  [ngStyle]="{'--btn-color': color}"
  (click)="eventEmit($event)"
  [icon]="icon"
  [routerLink]="routerLink"
  [label]="label">
</button>`,
})
export class ActionButtonComponent {
  @Input({ required: true }) icon!: string;
  @Input() class: string = ''; // Allows additional classes
  @Input() routerLink!: any[];
  @Input() label!: string;
  @Input() color: string = 'black'; ; // Default color
  @Output() clickEvent = new EventEmitter<Event>();

  eventEmit(event: Event) {
    this.clickEvent.emit(event);
  }
}
