import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { Comments } from '../comments.schema';
import { CommentsCreateDTO } from '../dtos/comments.create.dto';
import { CommentsRepository } from '../comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentsRepository.findComments();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, commentData: CommentsCreateDTO) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      const { contents, author } = commentData;
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);
      this.commentsRepository.createComment(
        targetCat._id,
        contents,
        validatedAuthor._id,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      this.commentsRepository.findCommentsByIdAndPlusLike(id);
    } catch (error) {}
  }
}
