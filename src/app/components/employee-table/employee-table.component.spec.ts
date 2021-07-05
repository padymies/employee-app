import { PrimeModule } from './../../prime.module';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './../../services/employee.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeTableComponent } from './employee-table.component';
import { of } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';

describe('EmployeeTableComponent', () => {
  let component: EmployeeTableComponent;
  let fixture: ComponentFixture<EmployeeTableComponent>;
  let service: EmployeeService;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeTableComponent, DialogComponent],
      imports: [ReactiveFormsModule, HttpClientModule, PrimeModule],
      providers: [
        EmployeeService,
        MessageService,
        ApiService,
        ConfirmationService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(EmployeeService);
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Api service to init component', () => {
    const spy = spyOn(apiService, 'getWorkPositions').and.returnValue(of([]));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('deleteEmployee should call service', () => {
    const spy = spyOn(service, 'deleteEmployee');
    component.deleteEmployee(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('showAddEmployeeDialog should update display property', () => {
    component.showAddEmployeeDialog();
    expect(component.display).toBeTrue();
  });
});
