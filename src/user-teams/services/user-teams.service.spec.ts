import { Test, TestingModule } from '@nestjs/testing';
import { UserTeamsService } from './services/user-teams.service';

describe('UserTeamsService', () => {
  let service: UserTeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTeamsService],
    }).compile();

    service = module.get<UserTeamsService>(UserTeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
