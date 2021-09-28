import { Injectable } from '@nestjs/common';
import { CommentsCreateDTO } from '../dtos/comments.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'hello world';
  }

  async createComment(id: string, comments: CommentsCreateDTO) {
    console.log(comments);
    return 'hello world';
  }

  async plusLike(id: string) {
    console.log(id);
    return 'hello world';
  }
}
