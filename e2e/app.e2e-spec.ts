import { NgCapsule9Page } from './app.po';

describe('NgCapsule9 App', () => {
  let page: NgCapsule9Page;

  beforeEach(() => {
    page = new NgCapsule9Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
  });
});
