import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrMessagesService {

  constructor(private toastrService: ToastrService) { }

  showErrorMessage(messageTitle: string, message: string): void {
    this.toastrService.error(message, messageTitle);
  }

  showWarningMessage(messageTitle: string, message: string): void {
    this.toastrService.warning(message, messageTitle);
  }

  showInfoMessage(messageTitle: string, message: string): void {
    this.toastrService.info(message, messageTitle);
  }

  showSuccessMessage(messageTitle: string, message: string, duration: number = 1000): void {
    this.toastrService.success(message, messageTitle, { timeOut: duration });
  }
}
