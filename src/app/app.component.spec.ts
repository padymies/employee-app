import { PrimeModule } from './prime.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeService } from './services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let fixture, app: AppComponent, service: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PrimeModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [ConfirmationService, EmployeeService, MessageService],
      declarations: [AppComponent, EmployeeTableComponent, DialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    service = TestBed.inject(EmployeeService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Employees-app'`, () => {
    expect(app.title).toEqual('Employees-app');
  });
  it(`should call Employeeservice to get Data`, () => {
    const spy = spyOn(service, 'loadEmployees');
    app.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
