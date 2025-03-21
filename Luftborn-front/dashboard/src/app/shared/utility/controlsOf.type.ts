import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ControlsOf<T> = T extends (infer ElementType)[]
  ? ElementType extends string | number | boolean | Date
    ? FormControl
    : FormArray<ControlsOf<ElementType>>
  : T extends Date
    ? FormControl<T | null>
    : T extends object
      ? FormGroup<{
          [Key in keyof T]: ControlsOf<T[Key]>;
        }>
      : FormControl;
