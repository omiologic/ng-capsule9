import { OmioCmsPage } from './app.po';

describe('omio-cms App', () => {
  let page: OmioCmsPage;

  beforeEach(() => {
    page = new OmioCmsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
