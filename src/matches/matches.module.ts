import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesController } from './controllers/matches.controller';
import { Match } from './entities/match.entity';
import { MatchesRepository } from './repositories/matches.repository';
import { MatchesService } from './services/matches.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [MatchesController],
  providers: [MatchesService, MatchesRepository],
})
export class MatchesModule {}
