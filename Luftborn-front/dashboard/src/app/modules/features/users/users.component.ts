import { HttpErrorResponse } from "@angular/common/http";
import { Component, ChangeDetectionStrategy, signal, effect } from "@angular/core";
import { toSignal, toObservable } from "@angular/core/rxjs-interop";
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule } from "@ngx-translate/core";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { TableModule, TablePageEvent } from "primeng/table";
import { combineLatest, startWith, debounceTime, switchMap, tap, map, catchError, of } from "rxjs";
import { AccountsAPI } from "../../../core/services/REM-api-service";
import { ActionButtonComponent } from "../../../shared/components/action-button/action-button.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { TruncateNamePipe } from "../../../shared/pipes/truncate-name.pipe";
import { ChangeLanguageService } from "../../../shared/services/change-language.service";
import { ConfirmationServiceWrapper } from "../../../shared/services/confirmation-service-wrapper.service";
import { ToasterService } from "../../../shared/services/toaster.service";
import { ControlsOf } from "../../../shared/utility/controlsOf.type";
import { ACTIVE_STATUS, Role_STATUS } from "../../../shared/utility/enum";
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { IUserFilter } from "./models/users.model";
import { SupplierService } from "./services/supplier.service";


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    RouterModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    FileUploadModule,
    ToolbarModule,
    DropdownModule,
    InputTextModule,
    BadgeModule,
    DropdownModule,
    TranslateModule,
    TableComponent,
    ActionButtonComponent,
    CardComponent,
    TruncateNamePipe,
    SearchInputComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UsersComponent {
  totalRecords: number = 0;
  status = ACTIVE_STATUS
  Role =  Role_STATUS
  refresh = signal(false);
  isArabic: boolean = false;


  constructor(
     private supplierService:SupplierService,
      private changeLanguageService: ChangeLanguageService,
    private toaster: ToasterService,
    private accountsApi: AccountsAPI,
    private confirmationServiceWrapper: ConfirmationServiceWrapper
  ) {
      effect(() => {
          this.isArabic = this.changeLanguageService.isArabic();
          this.status = [...this.status];
          this.Role = [...this.Role];
        });
  }



  filterForm: ControlsOf<IUserFilter> = new FormGroup({
    nameOrPhone: new FormControl(),
    registerFrom: new FormControl(),
    registerTo: new FormControl(),
    role: new FormControl(),
    isActive: new FormControl(),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(20),
  });

  get control() {
    return this.filterForm.controls.nameOrPhone;
  }


  changeActiveStatus(userId: string) {
    this.accountsApi.changeActivation({ userId }).subscribe(() => {
      this.toaster.showSuccess('User status changed successfully');
      this.refresh.set(!this.refresh());
    });
  }

 

  suppliers = toSignal(
    combineLatest([
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value),debounceTime(300)),
      toObservable(this.refresh),
    ]).pipe(
      switchMap(([res]) => {
    
        return this.supplierService
          .getAllSuppliers()
          .pipe(
            tap(res => console.log(res.data.data)),
            map(res => res.data.data ?? []),
            catchError((err: HttpErrorResponse) => {
              this.toaster.showError(err.error || err.message);
              return of(null);
            }),
          );
      })
    )
  );

  onPageChange(event: TablePageEvent) {
    const newPageNumber = event.first / event.rows + 1;
    this.filterForm.controls.pageNumber.setValue(newPageNumber);
    this.filterForm.controls.pageSize.setValue(event.rows);
  }
  
  deleteUser(supplierId: string) {
    this.supplierService.deleteSupplier(supplierId).subscribe(res => {
      this.toaster.showSuccess(res.messages);
      this.refresh.set(!this.refresh());

    });
  }
  confirmDelete(id: string) {
    this.confirmationServiceWrapper.confirmDelete(() => {
      this.deleteUser(id);
    });
  }
}
