import { TestBed, async } from '@angular/core/testing';
import { MenuComponent, MenuLabelComponent, MenuListComponent, MenuItemComponent } from './menu.component';

describe('MenuComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
  }));
  it('Should create the menu', async(() => {
    expect(component).toBeTruthy();
    const isClassIncluded = fixture.nativeElement.className.includes('menu');
    expect(isClassIncluded).toBeTruthy();
  }));
});

describe('MenuLabelComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuLabelComponent
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MenuLabelComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
  }));
  it('Should create the menu label', async(() => {
    expect(component).toBeTruthy();
    const isClassIncluded = fixture.nativeElement.className.includes('menu-label');
    expect(isClassIncluded).toBeTruthy();
  }));
});

describe('MenuListComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuListComponent,
        MenuItemComponent
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MenuListComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
  }));
  it('Should create the menu list', async(() => {
    expect(component).toBeTruthy();
    const isClassIncluded = fixture.nativeElement.className.includes('menu-list');
    expect(isClassIncluded).toBeTruthy();
  }));
});

describe('MenuItemComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuListComponent,
        MenuLabelComponent,
        MenuItemComponent
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
  }));
  it('Should create the menu item', async(() => {
    expect(component).toBeTruthy();
  }));
});
