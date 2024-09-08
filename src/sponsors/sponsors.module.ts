import { Module } from '@nestjs/common';
import { SponsorsController } from './controllers/sponsors.controller';
import { SponsorsService } from './services/sponsors.service';

@Module({
  controllers: [SponsorsController],
  providers: [SponsorsService],
})
export class SponsorsModule {}
