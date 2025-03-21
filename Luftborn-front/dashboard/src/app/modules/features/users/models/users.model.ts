import { UserRole } from "../../../../core/services/REM-api-service";
import { Pagination } from "../../../../shared/models/pagination.model";


export interface IUserFilter extends Pagination {
  nameOrPhone: string;
  role: UserRole;
  isActive: boolean;
  registerFrom: string;
  registerTo: string;
}

export interface IUser {
  id: string;
  role: string;
  fullName: string;
  phoneNumber: string;
  falLicense: string | undefined;
  idCard: string | null;
  commercialRegistrationNumber: string | undefined;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
  provinces: string[];
}

export interface IProvince {
  id: string;
  nameEn: string;
  nameAr: string;
}

export interface Item {
  key: string | number;  
  label: string;
}

export interface Prov {
  key: string;
  label: string; 
  parent?: string;
  partialSelected?: boolean; 
  expanded?: boolean; 
  children?: string[]; 
}


export interface Supplier {
  id: string;
  name: string;
  supplierType: string;
  description: string;
  notes: string;
}

export interface SupplierData {
  count: number;
  data: Supplier[];
}

export interface SupplierResponse {
  succeeded: boolean;
  messages: string[];
  data: SupplierData;
}

export interface ISupplier {
  id: string;
  name: string;
  description: string;
  notes: string;
  supplierType: number;
  address: string;
  contacts: IContact[]; 
}

export interface IContact {
  name: string;
  phoneNumber: string;
  email: string;
}
export interface SupplierId {
  id: string;
  name: string;
  description: string;
  notes: string;
  supplierType: number;
  address: string;
  contacts: Contact[];
}

export interface Contact {
  name: string;
  phoneNumber: string;
  email: string;
}
export interface ApiResponse<T> {
  succeeded: boolean;
  messages: string[];
  data: T;
}