import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    CalendarModule,
    CardModule,
    ConfirmDialogModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    ToastModule,
  ],
  exports: [
    ButtonModule,
    CalendarModule,
    CardModule,
    ConfirmDialogModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class PrimeModule {}
