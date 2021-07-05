import { EmployeeService } from '../../services/employee.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/employee.model';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnInit {
  @Input() employees: Observable<Employee[]>;

  public columns = [
    { field: 'name', header: 'Name', widht: '20%' },
    { field: 'surname', header: 'Surname', widht: '20%' },
    { field: 'workPosition', header: 'Work Position', widht: '30%' },
    { field: 'dateOfBirth', header: 'Date of Birth', widht: '15%' },
    { field: 'button', header: '', widht: '15%' },
  ];

  workPositions: any[];
  editing = false;
  display = false;

  constructor(
    private employeeService: EmployeeService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.api
      .getWorkPositions()
      .pipe(map((positions) => positions.map((data) => ({ name: data }))))
      .subscribe((data) => {
        this.workPositions = data;
      });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id);
  }

  showAddEmployeeDialog(): void {
    this.display = !this.display;
  }
}
