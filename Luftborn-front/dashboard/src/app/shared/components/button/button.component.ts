import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, RippleModule],
  template: `
    <button
      pButton
      pRipple
      class="btn custom-btn-primary"
      [class]="classes"
      [type]="type"
      [icon]="icon"
      [label]="label"
      (click)="click($event)"
      [disabled]="isDisabled">
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Output() onClick = new EventEmitter<any>();
  @Input() isDisabled: boolean = false;
  @Input() classes: string = '';
  @Input() type: string = 'submit';
  @Input() icon: string = 'pi pi-user';
  @Input() label: string = 'submit';
  @Input() form: FormGroup | undefined;

  click(event: any) {
    if (!this.form) {
      this.onClick.emit(event);
      return;
    }
    if (this.form.valid) {
      this.onClick.emit(event);
      return;
    }
    this.markAll(this.form);
  }

  markAll(form: AbstractControl) {
    if (form instanceof FormGroup) {
      Object.keys(form.controls).forEach(c => {
        if (form.get(c) instanceof FormGroup) {
          this.markAll(form.get(c)!);
        }
        if (form.get(c) instanceof FormArray) {
          (form.get(c) as FormArray).controls.forEach(f => {
            this.markAll(f);
          });
        }
        form.get(c)?.markAsDirty();
        form.get(c)?.markAllAsTouched();
      });
    }
  }
}
