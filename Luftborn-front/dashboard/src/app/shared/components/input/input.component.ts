import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule, InputTextModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input({ required: true }) control!: AbstractControl;
  @Input() type: string = 'text';
  @Input() id: string | undefined;
  @Input() classes: string = '';
  @Input() placeholder: string | undefined;
  @Output() value = new EventEmitter<string>();

  @ViewChild('autoFocus') input!: ElementRef<HTMLInputElement>;

  get errors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value.emit(value);
  }
}
