import { TicTacToeGamePage } from './app.po';

describe('tic-tac-toe-game App', () => {
  let page: TicTacToeGamePage;

  beforeEach(() => {
    page = new TicTacToeGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
