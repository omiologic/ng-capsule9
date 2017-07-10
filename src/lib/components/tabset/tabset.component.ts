import {
  AfterContentChecked,
  AfterViewChecked, Component, ContentChild, ContentChildren, Directive, EventEmitter, HostBinding, Input, Output,
  QueryList,
  TemplateRef, ViewEncapsulation
} from '@angular/core';

let nextId = 0;


export interface TabChangeEvent {
  activeId: string;
  nextId: string;
  preventDefault: () => void;
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
    <ul>
      <li *ngFor="let tab of tabs"
          [ngClass]="{'is-active': tab.id === activeId}">
        <a [id]="tab.id"
           [class.disabled]="tab.disabled"
           href (click)="!!select(tab.id)">
          {{tab.title}}
          <ng-template [ngTemplateOutlet]="tab.tabTitle?.templateRef"></ng-template>
        </a>
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
export class TabsetComponent implements AfterContentChecked {

  @HostBinding('class.tabs') private _isTab = true;

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Input() activeId: string;
  @Input() destroyOnHide = true;
  @Input() justify: 'start' | 'center' | 'end';

  @Output() tabChange = new EventEmitter<TabChangeEvent>();

  constructor() {
    this.justify = 'start';
  }

  select(tabId: string) {
    console.log('select', tabId);
    const selectedTab = this._getTabById(tabId);
    if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
      let defaultPrevented = false;

      this.tabChange.emit(
        {activeId: this.activeId, nextId: selectedTab.id, preventDefault: () => { defaultPrevented = true; }});

      if (!defaultPrevented) {
        this.activeId = selectedTab.id;
      }
    }
  }

  ngAfterContentChecked() {
    const activeTab = this._getTabById(this.activeId);
    this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);

    console.log('ngAfterContentChecked', this.activeId, this.tabs);
  }

  private _getTabById(id: string): TabComponent {
    const tabsWithId: TabComponent[] = this.tabs.filter(tab => tab.id === id);
    return tabsWithId.length ? tabsWithId[0] : null;
  }
}
