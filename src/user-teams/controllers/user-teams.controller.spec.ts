import { Test, TestingModule } from '@nestjs/testing';
import { UserTeamsController } from './user-teams.controller';

describe('UserTeamsController', () => {
  let controller: UserTeamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTeamsController],
    }).compile();

    controller = module.get<UserTeamsController>(UserTeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
