import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employee-table-header',
  templateUrl: './employee-table-header.component.html',
  styleUrls: ['./employee-table-header.component.scss'],
})
export class EmployeeTableHeaderComponent implements OnInit {
  @Input() tableReference: any;
  @Output() onDialogVisible = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  showAddEmployeeDialog() {
    this.onDialogVisible.emit();
  }
}
