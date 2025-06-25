import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from 'src/users/users.entity';
import { Industry } from 'src/industry/entities/industry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User, Industry])],
  providers: [ProfileService],
  exports: [TypeOrmModule, ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
