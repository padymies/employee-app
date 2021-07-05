import { environment } from './../../environments/environment.prod';
import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';

const mockEmployees = [
  {
    id: 1,
    name: 'Juan Antonio',
    surname: 'Padilla',
    workPosition: 'front-end developer',
    dateOfBirth: '31/01/1980',
  },
  {
    id: 2,
    name: 'Susana',
    surname: 'Padilla',
    workPosition: 'front-end developer',
    dateOfBirth: '30/01/1980',
  },
];

describe('EmployeeService', async () => {
  let service: EmployeeService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadEmployees should be call Get Method to local url', () => {
    service.loadEmployees();
    const req = http.expectOne(environment.LOCAL_BASE_URL);
    expect(req.request.method).toBe('GET');
  });

  it('getEmployees$ should return Employees', async () => {
    service.loadEmployees();
    const req = http.expectOne(environment.LOCAL_BASE_URL);
    req.flush(mockEmployees);

    service.employee$ = of(mockEmployees);
    service.getEmployees$().subscribe((data) => {
      expect(data.length).toBe(2);
    });

    expect(service.employees.length).toBe(2);
  });

  it('addEmployee should add a new employee', () => {
    service.loadEmployees();
    const req = http.expectOne(environment.LOCAL_BASE_URL);
    req.flush(mockEmployees);

    service.employee$ = of(mockEmployees);
    service.addEmployee({
      id: 3,
      name: 'New',
      surname: 'Employee',
      workPosition: 'front-end developer',
      dateOfBirth: '29/01/1980',
    });

    expect(service.employees.length).toBe(3);
  });

  it('updateEmployee should update a employee', () => {
    service.loadEmployees();
    const req = http.expectOne(environment.LOCAL_BASE_URL);
    req.flush(mockEmployees);

    service.employee$ = of(mockEmployees);
    service.updateEmployee(
      {
        id: 1,
        name: 'Updated',
        surname: 'Padilla',
        workPosition: 'sw admin',
        dateOfBirth: '31/01/1980',
      },
      0
    );
    expect(service.employees[0].name).toEqual('Updated');
  });

  it('deleteEmployee should remove a employee', () => {
    service.loadEmployees();
    const req = http.expectOne(environment.LOCAL_BASE_URL);
    req.flush(mockEmployees);
    service.employee$ = of(mockEmployees);
    service.deleteEmployee(1);
    expect(service.employees.length).toEqual(1);
  });
});
