import { EmployeeService } from './../../services/employee.service';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() workPositions: string[];
  @Input() display: boolean;
  @Output() onCloseDialog = new EventEmitter();

  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      surname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      workPosition: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onHide(): void {
    this.onCloseDialog.emit();
    this.cancel();
  }

  saveEmployee(): void {
    this.employeeService.addEmployee(this.employeeForm.value);
    this.employeeForm.reset();
    this.display = false;
  }

  cancel(): void {
    this.employeeForm.reset();
    this.display = false;
  }
}
