import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { model } from './sidebar';

@Component({
  selector: 'app-menu',
  template: `
    <ul class="layout-menu">
      <ng-container *ngFor="let item of model; let i = index">
        <li app-menuitem [item]="item" id="item" [index]="i" [root]="true"></li>
        <li class="menu-separator"></li>
      </ng-container>
    </ul>
  `,
})
export class AppMenuComponent {
  model = model;

  //   constructor(public layoutService: LayoutService) {}
}
