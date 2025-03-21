import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: ` <section>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header files">
              <ng-content select="[cardHeader]"></ng-content>
            </div>
            <ng-content select="[cardTable]"></ng-content>
          </div>
        </div>
      </div>
    </div>
  </section>`,
  styles: [
    `
      .card{
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
        border: 3px solid var(--surface-border);
      }
      .col-12 {
        padding-top: 0rem !important;
      }
    `,
  ],
})
export class CardComponent {}
