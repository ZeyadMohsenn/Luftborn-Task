import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule, NgTemplateOutlet],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class CustomBreadcrumbComponent {
  @Input('navBar') nav!: TemplateRef<any>;
  @Input({ required: true}) items!: Object[];
  home = { icon: 'pi pi-home', url: '/' };
  
}
