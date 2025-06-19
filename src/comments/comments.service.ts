import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  findAll() {
    return this.commentRepository.find({ relations: ['post', 'user'] });
  }

  findOne(id: number) {
    return this.commentRepository.findOne({
      where: { comment_id: id },
      relations: ['post', 'user'],
    });
  }

  create(comment: Partial<Comment>) {
    return this.commentRepository.save(comment);
  }

  update(id: number, comment: Partial<Comment>) {
    return this.commentRepository.update(id, comment);
  }

  delete(id: number) {
    return this.commentRepository.delete(id);
  }
}
