import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MatchesModule } from './matches/matches.module';
import { Organization } from './organizations/entities/organization.entity';
import { OrganizationsModule } from './organizations/organizations.module';
import { PlayersModule } from './players/players.module';

import { RolesModule } from './roles/roles.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { StaffMembersModule } from './staff-members/staff-members.module';
import { Team } from './teams/entities/team.entity';
import { TeamsModule } from './teams/teams.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT'), 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Team, Organization, User],
        migrations: ['dist/database/migrations/*.js'],
        synchronize: true,
        migrationsRun: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    AuthModule,
    RolesModule,
    UsersModule,
    OrganizationsModule,
    TeamsModule,
    StaffMembersModule,
    PlayersModule,
    MatchesModule,
    SponsorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
