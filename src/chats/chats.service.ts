import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatrepository: Repository<Chat>,
  ) {}

  findAll() {
    return this.chatrepository.find({ relations: ['user1', 'user2'] });
  }

  findOne(id: number) {
    return this.chatrepository.findOne({
      where: { chat_id: id },
      relations: ['user1', 'user2'],
    });
  }

  create(chat: Partial<Chat>) {
    return this.chatrepository.save(chat);
  }

  update(id: number, chat: Partial<Chat>) {
    return this.chatrepository.update(id, chat);
  }

  delete(id: number) {
    return this.chatrepository.delete(id);
  }
}
