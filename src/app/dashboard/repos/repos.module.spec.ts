import { ReposModule } from './repos.module';

describe('ReposModule', () => {
  let reposModule: ReposModule;

  beforeEach(() => {
    reposModule = new ReposModule();
  });

  it('should create an instance', () => {
    expect(reposModule).toBeTruthy();
  });
});
