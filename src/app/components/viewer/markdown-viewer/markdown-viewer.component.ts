import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {MarkdownService} from 'angular2-markdown';

@Component({
  selector: 'demo-md-viewer, markdown-viewer',
  template: `<div Markdown [path]="path" class="markdown-content"></div>`,
  styleUrls: ['./markdown-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MarkdownViewerComponent implements OnInit {

  @Input() path: string;

  constructor(private _markdown: MarkdownService) {}

  renderLinks() {
    this._markdown.renderer.link = (href: string, title: string, text: string) => {

      function marddownUrlToRouteUrl(url: string) {
        if (url.includes('/blob/master/src/lib/') || url.endsWith('.md')) {
          const pathArr = url.replace('/blob/master/src/lib/components/', 'reference/').split('/');
          pathArr.pop();
          return pathArr.join('/');
        }
        return url;
      }
      const repoURL = 'https://github.com/omiologic/ng-capsule9';
      const link = href.includes(repoURL)
        ? marddownUrlToRouteUrl(href.replace(repoURL, '/'))
        : href;

      return `<a href="${link}">${text}</a>`;
    }
  }

  renderTable() {
    this._markdown.renderer.table = (header: string, body: string) => {
      return `
        <table class="table">
          <thead>${header}</thead>
          <tbody>${body}</tbody>
        </table>`
    }
  }
  ngOnInit() {
    this.renderLinks();
    this.renderTable();
  }
}
