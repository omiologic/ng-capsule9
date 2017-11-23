import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavbarComponent, NavbarDropdownDirective, NavbarItemDirective, NavbarLinkDirective, NavbarMenuComponent,
  NavbarMenuGroupComponent
} from './navbar.component';
import {DropdownModule} from '../dropdown/dropdown.module';

const NAVBAR_COMPONENTS = [
  NavbarComponent,
  NavbarMenuComponent,
  NavbarMenuGroupComponent,
  NavbarDropdownDirective,
  NavbarItemDirective,
  NavbarLinkDirective
];

@NgModule({
  imports: [
    CommonModule,
    DropdownModule
  ],
  declarations: NAVBAR_COMPONENTS,
  exports: NAVBAR_COMPONENTS
})
export class NavbarModule { }
