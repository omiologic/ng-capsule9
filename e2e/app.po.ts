import { browser, element, by } from 'protractor';

export class NgCapsule9Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('layout-root h1')).getText();
  }
}
