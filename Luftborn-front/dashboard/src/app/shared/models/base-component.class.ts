import { DestroyRef, inject } from '@angular/core';
export class BaseComponent {
  destroyRef = inject(DestroyRef);
}
