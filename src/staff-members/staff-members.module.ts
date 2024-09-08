import { Module } from '@nestjs/common';
import { StaffMembersController } from './controllers/staff-members.controller';
import { StaffMembersService } from './services/staff-members.service';

@Module({
  controllers: [StaffMembersController],
  providers: [StaffMembersService],
})
export class StaffMembersModule {}
