import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { environment } from '../../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { ApiResponse } from 'app/modules/features/generate-unit/models/model/generatedUnits.model';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [NgClass, NgIf, TranslateModule],
  template: `
    <div class="file-upload-wrapper" [ngClass]="{ 'has-image': imageSrc }">
      <input
        type="file"
        #fileInput
        id="file-input"
        class="file-input"
        (change)="onFileSelected($event)"
        accept="image/*" />
        
      <label for="file-input" class="file-upload-label" *ngIf="!imageSrc">
        <i class="pi pi-plus" id="file-upload-icon"></i>
        <!-- TODO: Translate Upload Image -->
        <span class="file-upload-text">{{ 'shared.UploadImage' | translate }}</span>
      </label>

      <img *ngIf="imageSrc" [src]="imageSrc" class="uploaded-image" alt="Uploaded Image" />

      <!-- TODO: Translate Change Image -->
      <button *ngIf="imageSrc" class="change-image-btn">Change Image</button>
    </div>
  `,
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent {
  @ViewChild('fileInput', { static: true }) fileInput: HTMLInputElement | undefined;
  @Output() uploaded = new EventEmitter<ApiResponse | null>();

  @Input({ transform: (value: string | null) => (value ? `${environment.Url}/${value}` : null) })
  imageSrc: string | null = null;

  #uploadService = inject(UploadService);

  onFileSelected(event: Event): void {
    console.log(event)
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log(file);
      
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e);
        
        this.imageSrc = e.target.result;
        console.log(this.imageSrc);
        
        this.#uploadService.upload(file).subscribe({
          next: res => {
            if(res){
              console.log(res.data);
              
                
            this.uploaded.emit(res );

            }
           
          },
        });
      };

      reader.readAsDataURL(file);
    }
  }
  onChangeImageClick(): void {
    this.fileInput?.click();
  }
}
