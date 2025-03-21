import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  template: ` <div class="image-holder">
    <img [src]="imgUrl + '/' + src" style="width: 100%; height: 100%;" alt="unit icon" [class]="class" />
  </div>`,
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @Input() src: string | undefined | null;
  @Input() class: string = 'border-circle';
  imgUrl = environment.Url;
}
