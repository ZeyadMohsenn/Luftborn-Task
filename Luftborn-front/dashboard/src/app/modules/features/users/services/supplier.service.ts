import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierResponse, Supplier, SupplierId, ApiResponse } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = 'http://localhost:5224/api/suppliers';

  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(`${this.apiUrl}/GetAll`);
  }

  getSupplierById(id: string): Observable<ApiResponse<SupplierId>> {
    return this.http.get<ApiResponse<SupplierId>>(`${this.apiUrl}/GetById?id=${id}`);
  }

  createSupplier(supplier: Supplier): Observable<{ succeeded: boolean; messages: string[]; data: string }> {
    return this.http.post<{ succeeded: boolean; messages: string[]; data: string }>(
      `${this.apiUrl}/Create`, 
      supplier
    );
  }

  updateSupplier(supplier: Supplier): Observable<{ succeeded: boolean; messages: string[]; data: string }> {
    return this.http.put<{ succeeded: boolean; messages: string[]; data: string }>(
      `${this.apiUrl}/Update`, 
      supplier
    );
  }
  deleteSupplier(id: string): Observable<{ succeeded: boolean; messages: string[]; data: boolean }> {
    return this.http.request<{ succeeded: boolean; messages: string[]; data: boolean }>(
      'DELETE', `${this.apiUrl}/Delete`,
      {
        body: { id: id }, 
      }
    );
  }
}

