import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employeesSource: Subject<Employee[]>;
  employee$: Observable<Employee[]>;
  employees: Employee[];

  constructor(private http: HttpClient) {
    this.employeesSource = new Subject();
    this.employee$ = this.employeesSource.asObservable();
  }

  loadEmployees(): void {
    this.http.get<Employee[]>(environment.LOCAL_BASE_URL).subscribe((data) => {
      this.employees = data;
      this.employeesSource.next(this.employees);
    });
  }

  getEmployees$(): Observable<Employee[]> {
    return this.employee$;
  }

  addEmployee(employee: Employee): void {
    this.employees = [employee, ...this.employees];
    this.employeesSource.next(this.employees);
  }

  updateEmployee(employee: Employee, index: number): void {
    this.employees[index] = employee;
    this.employeesSource.next(this.employees);
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((employee) => employee.id != id);
    this.employeesSource.next(this.employees);
  }
}
