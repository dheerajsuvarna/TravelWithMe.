import { TravelWithMePage } from './app.po';

describe('travel-with-me App', () => {
  let page: TravelWithMePage;

  beforeEach(() => {
    page = new TravelWithMePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
