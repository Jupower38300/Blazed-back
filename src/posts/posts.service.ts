import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepository.find({ relations: ['user', 'comments'] });
  }

  findOne(id: number) {
    return this.postRepository.findOne({
      where: { post_id: id },
      relations: ['user', 'comments'],
    });
  }

  create(post: Partial<Post>) {
    return this.postRepository.save(post);
  }

  update(id: number, post: Partial<Post>) {
    return this.postRepository.update(id, post);
  }

  delete(id: number) {
    return this.postRepository.delete(id);
  }
}
