import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
  output,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, InputTextModule,CommonModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  control = input.required<FormControl>();
  @Input() placeholder: string = '';
  @Input() debounceTime: number = 500;
  @Input() borderStyle: boolean = true;

  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {
    this.sub = this.control()
      .valueChanges.pipe(debounceTime(this.debounceTime), distinctUntilChanged())
      .subscribe(value => this.search.emit(value));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
