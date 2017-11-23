import {Component, Input, NgModule, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MenuItem} from './tree-menu.types';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TabsetModule} from '../tabset/tabset.module'


export class BaseTreeMenuItem {

  handleClick(event, item) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    item.expanded = !item.expanded;

    if (!item.url) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({
        originalEvent: event,
        item: item
      });
    }
  }
}

@Component({
  selector: 'ms-tree-menu-sub',
  template: `
    <ul class="tree-menu-sub" [@submenu]="expanded ? 'visible' : 'hidden'">
      <ng-template ngFor let-child [ngForOf]="item.children">
        <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content">
        <li *ngIf="!child.separator">
          <a *ngIf="!child.routerLink"
             [href]="child.url||'#'"
             class="panel-block"
             [attr.tabindex]="child.expanded ? null : '-1'"
             [ngClass]="{'ui-menuitem-link-hasicon':child.icon&&child.children,'ui-state-disabled':child.disabled}"
             (click)="handleClick($event, child)" [attr.target]="child.target" [attr.title]="child.title">
            <span class="panel-icon"><i class="fa fa-book"></i></span>
            {{child.label}}
            <span class="ui-panelmenu-icon fa fa-fw"
                  [ngClass]="{'fa-caret-right':!child.expanded,'fa-caret-down':child.expanded}"
                  *ngIf="child.children"></span>
            <!--<span class="ui-menuitem-icon fa fa-fw"-->
                  <!--[ngClass]="child.icon" *ngIf="child.icon"></span>-->
            <!--<span class="ui-menuitem-text">{{child.label}}</span>-->
          </a>
          <a *ngIf="child.routerLink"
             [routerLink]="child.routerLink"
             [queryParams]="child.queryParams"
             [routerLinkActive]="'ui-state-active'"
             [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
             class="ui-menuitem-link ui-corner-all"
             [ngClass]="{
               'ui-menuitem-link-hasicon': child.icon&&child.children,
               'ui-state-disabled': child.disabled
             }"
             [attr.tabindex]="child.expanded ? null : '-1'"
             (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title">
            <span class="ui-panelmenu-icon fa fa-fw"
                  [ngClass]="{'fa-caret-right':!child.expanded,'fa-caret-down':child.expanded}"
                  *ngIf="child.children"></span>
            <span class="ui-menuitem-icon fa fa-fw" [ngClass]="child.icon" *ngIf="child.icon"></span>
            <span class="ui-menuitem-text">{{child.label}}</span>
          </a>
          <ms-tree-menu-sub [item]="child" [expanded]="child.expanded" *ngIf="child.children"></ms-tree-menu-sub>
        </li>
      </ng-template>
    </ul>
  `,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('submenu', [
      state('hidden', style({
        height: '0px'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class TreeMenuSubComponent extends BaseTreeMenuItem {

  @Input() item: MenuItem;

  @Input() expanded: boolean;

  constructor() {
    super();
    console.log('TreeMenuSubComponent', this.item);
  }

  handleClick(event, item) {
    super.handleClick(event, item);
  }
}

@Component({
  selector: 'ms-tree-menu',
  template: `
    <div [class]="styleClass" [ngStyle]="style"
         [ngClass]="'panel'">
      <!--<p class="panel-heading">-->
        <!--repositories-->
      <!--</p>-->
      <!--<div class="panel-block">-->
        <!--<p class="control has-icons-left">-->
          <!--<input class="input is-small" type="text" placeholder="search">-->
          <!--<span class="icon is-small is-left"><i class="fa fa-search"></i></span>-->
        <!--</p>-->
      <!--</div>-->
      <cp-tabset panelTab="true">
        <ng-container *ngFor="let item of model">
          <cp-tab>
            <ng-template tab-title>
              <a *ngIf="!item.routerLink" [href]="item.url||'#'"
                 (click)="handleClick($event,item)"
                 [attr.target]="item.target" [attr.title]="item.title">
                <!--<span *ngIf="item.children" class="ui-panelmenu-icon fa"
                  [ngClass]="{'fa-caret-right':!item.expanded,'fa-caret-down':item.expanded}"></span>-->
                <span class="ui-menuitem-icon fa" [ngClass]="item.icon" *ngIf="item.icon"></span>
                <span class="ui-menuitem-text">{{item.label}}</span>
              </a>
              <a *ngIf="item.routerLink" [routerLink]="item.routerLink"
                 [queryParams]="item.queryParams"
                 [routerLinkActive]="'ui-state-active'"
                 [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}"
                 [ngClass]="{'ui-panelmenu-headerlink-hasicon':item.icon}"
                 (click)="handleClick($event,item)"
                 [attr.target]="item.target" [attr.title]="item.title">
                <!--<span *ngIf="item.children" class="ui-panelmenu-icon fa"
                  [ngClass]="{'fa-caret-right':!item.expanded,'fa-caret-down':item.expanded}"></span>-->
                <span class="ui-menuitem-icon fa" [ngClass]="item.icon" *ngIf="item.icon"></span>
                <span class="ui-menuitem-text">{{item.label}}</span>
              </a>
            </ng-template>
            <ng-template tab-content>
              <div *ngIf="item.children"
                   [@rootItem]="item.expanded ? 'visible' : 'hidden'"
                   (@rootItem.done)="onToggleDone($event)"
                   [ngClass]="{'ui-panelmenu-content-wrapper-overflown': !item.expanded||animating}">
                <ms-tree-menu-sub [item]="item" [expanded]="true"></ms-tree-menu-sub>
              </div>
            </ng-template>
          </cp-tab>
        </ng-container>
      </cp-tabset>
    </div>
  `,
  styleUrls: ['./tree-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('rootItem', [
      state('hidden', style({
        height: '0px'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class TreeMenuComponent extends BaseTreeMenuItem {

  @Input() model: MenuItem[];

  @Input() style: any;

  @Input() styleClass: string;

  @Input() multiple: boolean = true;

  public animating: boolean;

  collapseAll() {
    for (const item of this.model) {
      if (item.expanded) {
        item.expanded = false;
      }
    }
  }

  handleClick(event, item) {
    if (!this.multiple) {
      for (const modelItem of this.model) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }

    this.animating = true;
    super.handleClick(event, item);
  }

  onToggleDone() {
    this.animating = false;
  }

}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TabsetModule,
    // BrowserAnimationsModule
  ],
  declarations: [
    TreeMenuComponent,
    TreeMenuSubComponent
  ],
  exports: [
    TreeMenuComponent,
    TreeMenuSubComponent
  ]
})
export class TreeMenuModule { }
