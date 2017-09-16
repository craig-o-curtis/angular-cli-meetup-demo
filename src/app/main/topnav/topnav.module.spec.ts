import { TopnavModule } from './topnav.module';

describe('TopnavModule', () => {
  let topnavModule: TopnavModule;

  beforeEach(() => {
    topnavModule = new TopnavModule();
  });

  it('should create an instance', () => {
    expect(topnavModule).toBeTruthy();
  });
});
