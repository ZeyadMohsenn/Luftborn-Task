import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../auth/services/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  styleUrl: './loader.component.scss',
  template: `
    @if (loading$ | async) {
      <div id="loader-container">
        <div id="loader">
          <svg id="circle-container" viewBox="25 25 50 50">
            <circle class="circle" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
          </svg>
        </div>
      </div>
    }
  `,
})
export class LoaderComponent {
  loading$ = inject(LoadingService).loading$;
}
