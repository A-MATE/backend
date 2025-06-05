import { Module } from '@nestjs/common';
import { MatchesController } from './controllers/matches.controller';
import { MatchesRepository } from './repositories/matches.repository';
import { MatchesService } from './services/matches.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MatchesController],
  providers: [MatchesService, MatchesRepository, PrismaService],
})
export class MatchesModule {}
