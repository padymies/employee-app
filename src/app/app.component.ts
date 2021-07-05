import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './model/employee.model';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Employees-app';

  public employees: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees$();
    this.employeeService.loadEmployees();
  }
}
