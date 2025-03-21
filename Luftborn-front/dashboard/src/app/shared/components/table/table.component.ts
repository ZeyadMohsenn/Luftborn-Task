import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TableRowDirective } from '../../directives/table-row.directive';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-table',
  standalone: true,
  imports:[
    TableModule,
    TranslateModule,
  
    BadgeModule,
    ButtonModule,
    NgTemplateOutlet,
    TableRowDirective,
    KeyValuePipe,
    ConfirmDialogModule,
    ConfirmPopupModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends object> {
  @ContentChild('header', { static: true }) headers!: TemplateRef<any>;
  @ContentChild('body', { static: true }) body!: TemplateRef<any>;
  @Input({ required: true, alias: 'values' }) list!: T[];
  @Input('rows') row: number = 20;
  @Input() totalRecords: number = 120;
  @Input() currentPageReportTemplate: string = 'Showing {first} to {last} of {totalRecords} entries';
  @Input() showCurrentPageReport: boolean = true;
  @Input() lazy: boolean = true;
  @Input() paginator: boolean = true;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Input() tableStyle: { [key: string]: string } = { 'min-width': '75rem' };
  @Output() lazyLoaded = new EventEmitter();
  @Output() pageChanged = new EventEmitter<TablePageEvent>();

  getUsers() {
    this.lazyLoaded.emit();
  }

  ChangePage(event: TablePageEvent) {
    this.pageChanged.emit(event);
  }
}
