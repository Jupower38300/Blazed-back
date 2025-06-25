import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: [
        'profile',
        'industry', // 👈 Ajouté
        'posts',
        'comments',
        'chatsSent',
        'chatsReceived',
        'missions',
        'missionHistories',
      ],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: [
        'profile',
        'industry', // 👈 Ajouté
        'posts',
        'comments',
        'chatsSent',
        'chatsReceived',
        'missions',
        'missionHistories',
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);

    // 👇 Lie les entités enfants dans les deux sens
    if (user.profile) {
      user.profile.user = user;
    }
    if (user.industry) {
      user.industry.user = user;
    }

    return await this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.update({ user_id: id }, userData);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete({ user_id: id });
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { profile: { email } },
      relations: ['profile'],
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.userRepository.count({
      where: { user_id: id },
    });
    return count > 0;
  }
}
