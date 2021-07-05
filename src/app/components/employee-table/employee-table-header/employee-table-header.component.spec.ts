import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTableHeaderComponent } from './employee-table-header.component';

describe('EmployeeTableHeaderComponent', () => {
  let component: EmployeeTableHeaderComponent;
  let fixture: ComponentFixture<EmployeeTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeTableHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value', () => {
    const spy = spyOn(component.onDialogVisible, 'emit');
    component.showAddEmployeeDialog();
    expect(spy).toHaveBeenCalled();
  });
});
