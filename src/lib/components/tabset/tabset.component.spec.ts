import { TestBed, async } from '@angular/core/testing';
import { TabChangeEvent, TabComponent, TabContentDirective, TabsetComponent, TabTitleDirective } from './tabset.component';
import {Component, ContentChild, ViewChild} from "@angular/core";

describe('TabsetComponent', () => {
  let fixture;
  let component;
  @Component({
    template: `
      <cp-tabset>
        <cp-tab title="title">
          <ng-template tab-content>
            <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth
              master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh
              dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum
              iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
          </ng-template>
        </cp-tab>
        <cp-tab>
          <ng-template tab-title><b>Fancy</b> Title</ng-template>
          <ng-template tab-content>
            <p>gdfgsdfgsdf</p>
          </ng-template>
        </cp-tab>
      </cp-tabset>
    `
  })
  class TestTabsetComponent {
    @ViewChild(TabsetComponent) tabset: TabsetComponent;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabsetComponent,
        TabComponent,
        TabTitleDirective,
        TabContentDirective,
        TestTabsetComponent
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestTabsetComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
  }));
  it('Should create the tabset', async(() => {
    expect(component).toBeTruthy();
    expect(component.tabset).not.toBeFalsy();
    console.log('component', component.tabset);
  }));

  it('Should render TabComponent', () => {
    expect(component.tabset.tabs.length).toBe(2);
  });

  it('Should set first tab to be active', () => {
    expect(component.tabset.activeId).toBe(component.tabset.tabs.first.id)
  });

  describe('select(tabId: string)', () => {
    it('Should set activeId with provided tabId', () => {
      component.tabset.select(component.tabset.tabs.last.id);
      fixture.detectChanges();
      expect(component.tabset.activeId).toBe(component.tabset.tabs.last.id);
    });
    it('Should not set activeId with non-existing tabId', () => {
      component.tabset.select('new-tab-id');
      fixture.detectChanges();
      expect(component.tabset.activeId).toBe(component.tabset.tabs.first.id);
    });
    it('Should emit tabChange', () => {
      const spy = spyOn(component.tabset.tabChange, 'emit');
      component.tabset.select(component.tabset.tabs.last.id);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith({
        activeId: component.tabset.tabs.first.id,
        nextId: component.tabset.tabs.last.id
      });
    });
  })
});
