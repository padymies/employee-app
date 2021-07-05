import { Employee } from './../../../model/employee.model';
import { EmployeeService } from './../../../services/employee.service';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cell-buttons',
  templateUrl: './cell-buttons.component.html',
  styleUrls: ['./cell-buttons.component.scss'],
})
export class CellButtonsComponent implements OnInit {
  @Input() editing: boolean;
  @Input() index: number;
  @Input() employee: Employee;
  tempEmployee: Employee;

  constructor(
    private confirmationService: ConfirmationService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {}

  onRowEditInit(): void {
    this.tempEmployee = { ...this.employee };
  }
  onRowEditSave(): void {
    this.employee.name.trim() === ''
      ? this.cancelChanges()
      : this.employeeService.updateEmployee(this.employee, this.index);
  }
  onRowEditCancel(): void {
    this.cancelChanges();
  }

  deleteEmployee(): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want remove to ${this.employee.name}`,
      accept: () => {
        this.employeeService.deleteEmployee(this.employee.id);
      },
    });
  }

  cancelChanges(): void {
    this.employee.name = this.tempEmployee.name;
    this.employee.workPosition = this.tempEmployee.workPosition;
  }
}
