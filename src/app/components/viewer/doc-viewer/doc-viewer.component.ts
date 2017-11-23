import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {TabsetComponent} from '../../../../../lib/components/tabset/tabset.component';
@Component({
  selector: 'demo-doc-viewer',
  template: `
    <h1 *ngIf="label">{{label}}</h1>
    <h2 *ngIf="description">{{description}}</h2>
    <cp-tabset #tabset (tabChange)="beforeChange($event)">
      <cp-tab *ngFor="let item of routes" [id]="item.path" [title]="item.title" >
        <ng-template tab-content>
          <router-outlet></router-outlet>
        </ng-template>
      </cp-tab>
    </cp-tabset>
  `,
  // styleUrls: ['./doc-viewer.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class DocViewerComponent implements AfterViewInit {
  @ViewChild('tabset') tabset: TabsetComponent;
  @Input() label: string;
  @Input() description: string;
  @Input() route: string;

  @Input() routes: {path: string, title: string}[];

  public activeId: string;

  constructor(
    private _router: Router,
    private _location: Location
  ) {
  }

  ngAfterViewInit() {
    const pathArr = this._location.path().split('/');
    const tabRoute = pathArr.pop();
    console.log(tabRoute, this.tabset);
    this.tabset.select(tabRoute)
  }
  beforeChange(e) {
    const pathArr = this._location.path().split('/');
    const tabRoute = pathArr.pop();
    console.log(tabRoute, this.tabset, e.nextId);
    if (tabRoute !== e.nextId) {
      return this._router.navigate(['documentation', this.route, e.nextId])
    }
  }
}
