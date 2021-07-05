import { Employee } from 'src/app/model/employee.model';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee.service';

import { CellButtonsComponent } from './cell-buttons.component';

describe('CellButtonsComponent', () => {
  let component: CellButtonsComponent;
  let fixture: ComponentFixture<CellButtonsComponent>;
  let service: EmployeeService;
  let confirmationService: ConfirmationService;
  let mockEmployee: Employee;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellButtonsComponent],
      imports: [HttpClientModule],
      providers: [ConfirmationService, EmployeeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(EmployeeService);
    confirmationService = TestBed.inject(ConfirmationService);
    mockEmployee = {
      id: 1,
      name: 'MockEmployee',
      surname: 'mock',
      dateOfBirth: '01/01/2000',
      workPosition: 'sw admin',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onRowEditInit should save employee into tempEmployee', () => {
    component.employee = mockEmployee;
    component.onRowEditInit();
    expect(component.tempEmployee).toEqual(mockEmployee);
  });

  it('onRowEditSave should update employee', () => {
    const spy = spyOn(service, 'updateEmployee');
    component.employee = mockEmployee;
    component.onRowEditSave();
    expect(spy).toHaveBeenCalledWith(mockEmployee, component.index);
  });

  it('onRowEditSave should cancel if name is not provider', () => {
    const spy = spyOn(component, 'cancelChanges');
    component.employee = mockEmployee;
    component.employee.name = '';
    component.onRowEditSave();
    expect(spy).toHaveBeenCalled();
  });

  it('onRowEditCancel should cancel', () => {
    const spy = spyOn(component, 'cancelChanges');
    component.employee = mockEmployee;
    component.onRowEditCancel();
    expect(spy).toHaveBeenCalled();
  });

  it('deleteEmployee should call confirmationService and employeeService', () => {
    const spyConfirmation = spyOn<any>(
      confirmationService,
      'confirm'
    ).and.callFake((confirmation: any) => confirmation.accept());

    const spyEmployee = spyOn(service, 'deleteEmployee');
    component.employee = mockEmployee;
    component.deleteEmployee();
    expect(spyConfirmation).toHaveBeenCalled();
    expect(spyEmployee).toHaveBeenCalled();
  });

  it('cancelChanges should reset the changes', () => {
    component.employee = mockEmployee;
    component.tempEmployee = {
      id: 1,
      name: 'old-Name',
      surname: 'mock',
      workPosition: 'old-workPosition',
      dateOfBirth: '01/01/2000',
    };
    component.cancelChanges();
    expect(component.employee.name).toBe('old-Name');
    expect(component.employee.workPosition).toBe('old-workPosition');
  });
});
