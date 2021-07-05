import { PrimeModule } from './../../prime.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTableHeaderComponent } from './employee-table-header/employee-table-header.component';
import { EmployeeTableComponent } from './employee-table.component';
import { CellButtonsComponent } from './cell-buttons/cell-buttons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';

@NgModule({
  declarations: [
    CellButtonsComponent,
    EmployeeTableComponent,
    EmployeeTableHeaderComponent,
    DialogComponent,
  ],
  imports: [CommonModule, PrimeModule, ReactiveFormsModule, FormsModule],
  exports: [
    CellButtonsComponent,
    EmployeeTableComponent,
    EmployeeTableHeaderComponent,
  ],
})
export class EmployeeTableModule {}
