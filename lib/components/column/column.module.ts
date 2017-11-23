import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './column.component';
import { ColumnsComponent } from './columns.component';

@NgModule({
  declarations: [
    ColumnsComponent,
    ColumnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ColumnsComponent,
    ColumnComponent
  ]
})
export class ColumnModule { }
