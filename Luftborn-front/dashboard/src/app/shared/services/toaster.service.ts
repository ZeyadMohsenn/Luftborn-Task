import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private messageService: MessageService) {}
  showSuccess(details: string | string[] | undefined) {
    if(!details) return;
    if (Array.isArray(details)) {
      details.forEach(detail => {
        this.messageService.add({
          severity: 'info',
          summary: 'info',
          detail: detail,
        });
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'info',
        detail: details,
      });
    }
  }
  showInfo(details: string | string[] | undefined) {
    if(!details) return;
    if (Array.isArray(details)) {
      details.forEach(detail => {
        this.messageService.add({
          severity: 'info',
          summary: 'info',
          detail: detail,
        });
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: details,
      });
    }
  }
  showWarn(details: string | string[] | undefined) {
    if(!details) return;
    if (Array.isArray(details)) {
      details.forEach(detail => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warn',
          detail: detail,
        });
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: details,
      });
    }
  }
  showError(details: string | string[] | undefined) {
    if(!details) return;
    if (Array.isArray(details)) {
      details.forEach(detail => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: detail,
        });
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: details,
      });
    }
  }
}
