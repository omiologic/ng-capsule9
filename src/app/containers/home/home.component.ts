import {Component, ViewEncapsulation} from '@angular/core';

/* tslint:disable max-line-length */
@Component({
  selector: 'demo-home',
  template: `
    <section class="hero is-medium has-text-centered">
      <div class="hero-body">
        <div class="container is-fluid">
          <p id="b">
            <svg width="400" height="140">
              <rect x="45" y="5" width="310" height="130" rx="65" ry="65"/>
              <rect x="60" y="20" width="280" height="100" rx="50" ry="50" fill="#ffffff"/>
              <rect x="170" y="10" width="180" height="120" rx="60" ry="60"/>
              <rect x="180" y="20" width="160" height="100" rx="50" ry="50" fill="#00d1b2"/>
              <rect x="150" y="35" width="100" height="10" rx="5" ry="5" fill="#ffffff"/>
              <rect x="270" y="35" width="10" height="10" rx="5" ry="5" fill="#ffffff"/>
            </svg>
          </p>
          <h1 id="capsule-9" class="title">CAPSULE 9</h1>
          <h2 id="modern-framework" class="subtitle">
            An <strong>elegant</strong> User Interface Suite based on <strong>Angular 4 +</strong> & <strong>Bulma</strong>
          </h2>
          <pre id="npm"><code>npm install ng-capsule9</code></pre>
          <div id="ghbtns" class="block">
            <iframe frameborder="0" scrolling="0" width="160px" height="30px"
                    src="https://ghbtns.com/github-btn.html?user=omiologic&amp;repo=ng-capsule9&amp;type=star&amp;count=true&amp;size=large">
            </iframe>
            <iframe frameborder="0" scrolling="0" width="80px" height="30px"
                    src="https://ghbtns.com/github-btn.html?user=omiologic&amp;repo=ng-capsule9&amp;type=fork&amp;count=false&amp;size=large">
            </iframe>
          </div>
          <p id="download" class="hero-buttons">
            <!--<a class="button is-primary is-large" href="https://github.com/jgthms/bulma/archive/0.5.3.zip">-->
            <a class="button is-primary is-large" href="">
              <span class="icon">
                <i class="fa fa-download"></i>
              </span>
              <span>Download</span>
              <small>v0.0.1</small>
            </a>
            <a class="button is-large" routerLink="/documentation/overview/start/">
              View docs
            </a>
          </p>
        </div>
      </div>
    </section>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container is-fluid">
          <nav class="columns">
            <a class="column has-text-centered" routerLink="documentation/overview/responsiveness/">
          <span class="icon is-large" style="margin-right: -15px;">
            <i class="fa fa-3x fa-mobile"></i>
          </span>
              <span class="icon is-large">
            <i class="fa fa-3x fa-tablet"></i>
          </span>
              <span class="icon is-large" style="margin-right: 10px;">
            <i class="fa fa-3x fa-desktop"></i>
          </span>
              <p class="title is-4" style="margin-top: 0.5em;"><strong>Responsive</strong></p>
              <p class="subtitle">Designed for <strong>mobile</strong> first</p>
            </a>
            <a class="column has-text-centered" routerLink="/documentation/overview/modular/">
          <span class="icon is-large">
            <i class="fa fa-3x fa-cubes"></i>
          </span>
              <p class="title is-4" style="margin-top: 0.5em;"><strong>Modular</strong></p>
              <p class="subtitle">Just import what you <strong>need</strong></p>
            </a>
            <a class="column has-text-centered" routerLink="/documentation/columns/basics/">
          <span class="icon is-large">
            <i class="fa fa-3x fa-css3"></i>
          </span>
              <p class="title is-4" style="margin-top: 0.5em;"><strong>Modern</strong></p>
              <p class="subtitle">Built with <strong>Flexbox</strong></p>
            </a>
            <a class="column has-text-centered" href="https://github.com/omiologic/ng-capsule9">
          <span class="icon is-large">
            <i class="fa fa-3x fa-github"></i>
          </span>
              <p class="title is-4" style="margin-top: 0.5em;"><strong>Free</strong></p>
              <p class="subtitle">Open source on <strong>GitHub</strong></p>
            </a>
          </nav>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/* tslint:enable max-line-length */
export class HomeComponent {


}
