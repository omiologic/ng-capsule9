import {
  AfterContentChecked,
  AfterViewChecked, Component, ContentChild, ContentChildren, Directive, EventEmitter, HostBinding, Input, OnChanges,
  Output,
  QueryList, SimpleChange, SimpleChanges,
  TemplateRef, ViewEncapsulation
} from '@angular/core';

let nextId = 0;


export interface TabChangeEvent {
  activeId: string;
  nextId: string;
}

@Directive({
  selector: 'ng-template[cpTabTitle], ng-template[tabTitle], ng-template[tab-title]'
})
export class TabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: 'ng-template[cpTabContent], ng-template[tabContent], ng-template[tab-content]'
})
export class TabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'cp-tab',
  template: `<ng-content></ng-content>`
})
export class TabComponent {
  @Input() id = `cp-tab-${nextId++}`;
  @Input() title: string;
  @Input() disabled = false;

  @ContentChild(TabTitleDirective) tabTitle: TabTitleDirective;
  @ContentChild(TabContentDirective) tabContent: TabContentDirective;
}

@Component({
  selector: 'cp-tabset',
  template: `
    <ul [ngClass]="{'panel-tabs': _isPanelTab}">
      <li *ngFor="let tab of tabs"
          [ngClass]="{'is-active': tab.id === activeId}"
          [id]="tab.id"
          [class.disabled]="tab.disabled"
          (click)="select(tab.id)">
        {{tab.title}}
        <ng-template [ngTemplateOutlet]="tab.tabTitle?.templateRef"></ng-template>
      </li>
    </ul>
    <div class="tab-content">
      <ng-template ngFor let-tab [ngForOf]="tabs">
        <div class="tab-pane {{tab.id === activeId ? 'active' : null}}"
             *ngIf="!destroyOnHide || tab.id === activeId">
          <ng-template [ngTemplateOutlet]="tab.tabContent.templateRef"></ng-template>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./tabset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabsetComponent implements OnChanges {

  private _isPanelTab = false;

  @HostBinding('class.tabs') private _isTab = true;
  // @HostBinding('class.panel-tabs')
  @Input() set panelTab(val: boolean) {
    this._isPanelTab = val;
    // if (this._isPanelTab) {
    //   this._isTab = false;
    // }
  }
  get panelTab() {
    return this._isPanelTab;
  }


  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Input() activeId: string;
  @Input() destroyOnHide = true;
  @Input() justify: 'start' | 'center' | 'end';

  @Output() tabChange = new EventEmitter<TabChangeEvent>();

  constructor() {
    this.justify = 'start';
  }

  select(tabId: string) {
    // console.log('select', tabId);
    const selectedTab = this._getTabById(tabId);
    if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
      const defaultPrevented = false;

      this.tabChange.emit({
        activeId: this.activeId,
        nextId: selectedTab.id
      });

      if (!defaultPrevented) {
        this.activeId = selectedTab.id;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const activeIdChanges: SimpleChange = changes['activeId'];
    if (activeIdChanges) {
      const activeTab = this._getTabById(activeIdChanges.currentValue);
      this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    }
  }

  private _getTabById(id: string): TabComponent {
    const tabsWithId: TabComponent[] = this.tabs.filter(tab => tab.id === id);
    return tabsWithId.length ? tabsWithId[0] : null;
  }
}
