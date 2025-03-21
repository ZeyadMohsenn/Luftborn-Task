import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from 'app/modules/features/generate-unit/models/model/generatedUnits.model';
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  api = 'Files';
  constructor(private _http: HttpClient) {}

  upload(file: any) {
    let formData = new FormData();
    formData.append('files', file);
    return this._http.post<ApiResponse | null>(`${environment.ApiUrl}/api/${this.api}/Upload`, formData, {
      reportProgress: true,
    });
  }

  delete(filePath: string) {
    return this._http.delete(`${environment.ApiUrl}/${this.api}/${filePath}`);
  }
}
