import { Test, TestingModule } from '@nestjs/testing';
import { UserTeamRolesController } from './user-team-roles.controller';

describe('UserTeamRolesController', () => {
  let controller: UserTeamRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTeamRolesController],
    }).compile();

    controller = module.get<UserTeamRolesController>(UserTeamRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
