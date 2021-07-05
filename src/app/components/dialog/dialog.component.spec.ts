import { EmployeeService } from './../../services/employee.service';
import { PrimeModule } from './../../prime.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let service: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [ReactiveFormsModule, HttpClientModule, PrimeModule],
      providers: [EmployeeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(EmployeeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onHide should emit and cancel ', () => {
    const spyEmitter = spyOn(component.onCloseDialog, 'emit');
    const spyCancel = spyOn(component, 'cancel');
    component.onHide();
    expect(spyEmitter).toHaveBeenCalled();
    expect(spyCancel).toHaveBeenCalled();
  });

  it('saveEmployee should call service, reset form and close modal ', () => {
    const mockFormValue = {
      name: 'MockEmployee',
      surname: 'mock',
      dateOfBirth: '01/01/2000',
      workPosition: 'sw admin',
    };

    component.employeeForm.setValue(mockFormValue);
    const spyService = spyOn(service, 'addEmployee');
    component.saveEmployee();
    expect(spyService).toHaveBeenCalledWith(mockFormValue as any);
    expect(component.employeeForm.get('name')?.value).toBeNull();
    expect(component.display).toBeFalse();
  });

  it('cancel should reset form and close modal', () => {
    const mockFormValue = {
      name: 'MockEmployee',
      surname: 'mock',
      dateOfBirth: '01/01/2000',
      workPosition: 'sw admin',
    };

    component.employeeForm.setValue(mockFormValue);
    component.cancel();
    expect(component.employeeForm.get('name')?.value).toBeNull();
    expect(component.display).toBeFalse();
  });
});
