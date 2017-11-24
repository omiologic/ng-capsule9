import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { DropdownButton, DropdownTrigger } from './dropdown.component';
import {DropdownService} from './dropdown.service';

describe('DropdownButton', () => {
  let component: DropdownButton;
  let fixture: ComponentFixture<DropdownButton>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownButton ],
      providers: [ DropdownService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownButton);
    component = fixture.componentInstance;
  });

  it('should create', inject([DropdownService], (dropdown: DropdownService) => {
    component.id = 'id-1';
    component.trigger = new DropdownTrigger(dropdown);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
