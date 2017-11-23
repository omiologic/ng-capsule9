import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DropdownButton,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from './dropdown.component';
import { DropdownService } from './dropdown.service';

const DROPDOWN_MODULE_EXPORTS = [
  DropdownButton,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: DROPDOWN_MODULE_EXPORTS,
  exports: DROPDOWN_MODULE_EXPORTS,
  providers: [DropdownService]
})
export class DropdownModule { }
