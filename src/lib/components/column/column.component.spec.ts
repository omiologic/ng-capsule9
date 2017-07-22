import {TestBed, async, inject} from '@angular/core/testing';

import { ColumnComponent } from './column.component';
import {ElementRef, Renderer2} from '@angular/core';

describe('ColumnComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColumnComponent
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ColumnComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
  }));
  it('Should create the column', async(() => {
    expect(component).toBeTruthy();
    const isClassIncluded = fixture.nativeElement.className.includes('column');
    expect(isClassIncluded).toBeTruthy();
  }));
  describe('setHostClass()', () => {
    const testCases = [
      'mobile',
      'tablet',
      'desktop',
      'offset'
    ];
    for (let i = 0; i < testCases.length; i++) {
      const option = testCases[i];
      it(`Should set responsive ${option} when ${option} input property is provided`, () => {
        const spy = spyOn(component.renderer, 'addClass');
        component[option] = 10;
        component.setHostClass();
        expect(spy).toHaveBeenCalled();
        if(option === 'offset') {
          expect(spy).toHaveBeenCalledWith(component.elRef.nativeElement, `is-${option}-${component[option]}`);
        } else {
          expect(spy).toHaveBeenCalledWith(component.elRef.nativeElement, `is-${component[option]}-${option}`);
        }
      });
    }
  });
});
