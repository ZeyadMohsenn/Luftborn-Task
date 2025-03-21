import { Supplier } from './../../models/users.model';
import { NgIf, CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, input, effect } from "@angular/core";
import { toSignal, toObservable } from "@angular/core/rxjs-interop";
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule } from "@ngx-translate/core";
import { MenuItem, TreeNode } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { switchMap, tap, catchError, of, map, filter } from "rxjs";
import { AreaOfInterestAPI, AccountsAPI, ProvincesDto, UpdateAccountCommand, AreaOfInterestWebDropdownResponse, ProvinceWebDto } from "../../../../../core/services/REM-api-service";
import { ChangeLanguageService } from "../../../../../shared/services/change-language.service";
import { ToasterService } from "../../../../../shared/services/toaster.service";
import { ControlsOf } from "../../../../../shared/utility/controlsOf.type";
import { IContact, ISupplier, IUser, Item } from "../../models/users.model";
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeSelectModule } from 'primeng/treeselect';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SupplierService } from "../../services/supplier.service";


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgIf,
    SplitButtonModule,
    ButtonModule,
    DropdownModule,
    TranslateModule,
    InputTextModule,
    RouterModule,
    MultiSelectModule,
    TreeSelectModule,
    CommonModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {


  id = input<string>('');
  isArabic: boolean = false;
  editMode = false;
  
  constructor(
    private supplierService:SupplierService,
    private router: Router,
   
    private toaster: ToasterService,
   
  ) {
  
  }

  ngOnInit(): void {
    
    
    if (this.id() != undefined) {
      
      this.editMode = true;
  
    } else {
      this.editMode = false;
    }


  }

  form: FormGroup = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    notes: new FormControl<string>('', { nonNullable: true }),
    supplierType: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    contacts: new FormArray<FormGroup>([]),
  });

 
  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

 
  getControl(controlName: string): FormControl {
    return this.form.get(controlName) as FormControl;
  }
  
 
  createContact(contact?: any): FormGroup {
    return new FormGroup({
      name: new FormControl<string>(contact?.name || '', [Validators.required]),
      phoneNumber: new FormControl<string>(contact?.phoneNumber || '', [Validators.required]),
      email: new FormControl<string>(contact?.email || '', [Validators.required, Validators.email])
    });
  }
  

  populateForm(data: any) {
    this.form.patchValue({
      id: data.id,
      name: data.name,
      description: data.description,
      notes: data.notes,
      supplierType: data.supplierType,
      address: data.address
    });
  
   
    this.contacts.clear();
    data.contacts.forEach((contact: any) => this.contacts.push(this.createContact(contact)));
  }
  

  addContact() {
    this.contacts.push(this.createContact());
  }
  
  
  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  
  Supplier = toSignal(
    toObservable(this.id).pipe(filter(id => !!id),
      switchMap(userId =>
        this.supplierService.getSupplierById(userId).pipe(
          tap((data) => {
            this.editMode = true;
            
            this.form.patchValue({
              id: data.data.id,
              name: data.data.name,
              description: data.data.description,
              notes: data.data.notes,
              supplierType: data.data.supplierType,
              address: data.data.address
            });
  
            this.contacts.clear(); 
            if (data.data.contacts && Array.isArray(data.data.contacts)) {
              data.data.contacts.forEach((contact: any) => {
                this.contacts.push(new FormGroup({
                  name: new FormControl(contact.name, [Validators.required]),
                  phoneNumber: new FormControl(contact.phoneNumber, [Validators.required]),
                  email: new FormControl(contact.email, [Validators.required, Validators.email])
                }));
              });
            }
  
          }),
          catchError((err: HttpErrorResponse) => {
            this.toaster.showError(err.error || err.message);
            return of(null);
          })
        )
      )
    )
  );
  




  adSupplier() {
    this.supplierService.createSupplier(this.form.getRawValue()).subscribe({
      next: res => {
        if (res.succeeded) {
          this.toaster.showSuccess(res.messages);
          this.router.navigate(['/users']);
        } else {
          this.toaster.showError(res.messages);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.toaster.showError(err.error);
      },
    });
  }
  updateSupplier() {
    this.supplierService.updateSupplier(this.form.getRawValue()).subscribe({
      next: res => {
        if (res.succeeded) {
          this.toaster.showSuccess(res.messages);
          this.router.navigate(['/users']);
        } else {
          this.toaster.showError(res.messages);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.toaster.showError(err.error);
      },
    });
  }




 

  submit() {
    if (this.editMode) {
      this.updateSupplier();
    } else {
      this.adSupplier();
    }
  }
   
  }

