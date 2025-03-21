import { ContentChild, Directive, Input, OnInit, TemplateRef, ViewContainerRef, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Directive({
  selector: '[Roles]',
  standalone: true,
})
export class RoleDirective  {
  #vcr = inject(ViewContainerRef);
  #authService = inject(AuthService);
  #templateRef = inject(TemplateRef);

  // userPermission = computed(() => this.#authService.permissions());

//   ngOnInit(): void {
//     if (this.Roles === undefined) {
//       this.#vcr.createEmbeddedView(this.#templateRef);
//       return;
//     }
//     // const isAuthorized = this.userPermission().some((p: string) => this.Roles!.includes(p));
//     if (isAuthorized) {
//       this.#vcr.createEmbeddedView(this.#templateRef);
//     } else {
//       this.#vcr.clear();
//     }
//   }
//   @Input({ required: true }) Roles: string[] | undefined;
// }
}
