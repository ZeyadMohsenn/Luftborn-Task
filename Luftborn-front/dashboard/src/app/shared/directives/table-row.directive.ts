import { Directive, Input } from '@angular/core';

interface TableRowTemplateContext<T extends object> {
  $implicit: T;
  rowIndex?: number;
  clear: (item: T) => void;
  item: T;
}

@Directive({
  selector: 'ng-template[appTableRow]',
  standalone: true,
})
export class TableRowDirective<T extends object> {
  @Input('appTableRow') items!: T[];

  static ngTemplateContextGuard<TContextItem extends object>(
    dir: TableRowDirective<TContextItem>,
    ctx: unknown
  ): ctx is TableRowTemplateContext<TContextItem> {
    return true;
  }
}
