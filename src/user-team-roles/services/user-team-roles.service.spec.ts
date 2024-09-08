import { Test, TestingModule } from '@nestjs/testing';
import { UserTeamRolesService } from './user-team-roles.service';

describe('UserTeamRolesService', () => {
  let service: UserTeamRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTeamRolesService],
    }).compile();

    service = module.get<UserTeamRolesService>(UserTeamRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
