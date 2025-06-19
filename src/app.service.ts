import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { User } from './users/users.entity';
import { UUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
  async getHello(userId: UUID): Promise<string> {
    const user: User = await this.usersService.findOne(userId);
    return `Hello ${user.profile}!`;
  }
}
