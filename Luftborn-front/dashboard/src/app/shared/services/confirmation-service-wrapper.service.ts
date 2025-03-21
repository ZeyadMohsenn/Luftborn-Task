import { computed, effect, Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChangeLanguageService } from './change-language.service';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationServiceWrapper {
  isArabic = computed(() => this.changeLanguageService.isArabic());

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private changeLanguageService: ChangeLanguageService
  ) {}

  confirmDelete(acceptCallback: () => void, rejectCallback?: () => void) {
    const message = this.isArabic() ? 'هل أنت متأكد أنك تريد الحذف؟' : 'Are you sure you want to delete';
    const acceptLabel = this.isArabic() ? 'نعم' : 'Yes';
    const rejectLabel = this.isArabic() ? 'لا' : 'No';

    this.confirmationService.confirm({
      message: message,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        acceptCallback();
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Item has been deleted' });
      },
      reject: () => {
        if (rejectCallback) {
          rejectCallback();
        } else {
          this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Action cancelled' });
        }
      },
      acceptLabel: acceptLabel,
      rejectLabel: rejectLabel,
      closeOnEscape: true,
      blockScroll: false,
      rejectVisible: true,
    });
  }
}
