import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from './comments.schema';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {}

  async findComments() {
    const comments = await this.commentsModel.find();
    return comments;
  }

  async createComment(targetCatId: string, contents: string, authorId: string) {
    const newComment = new this.commentsModel({
      author: authorId,
      contents,
      info: targetCatId,
    });
    return await newComment.save();
  }

  async findCommentsByIdAndPlusLike(id: string) {
    const comment = await this.commentsModel.findById(id);
    comment.likeCount += 1;
    return await comment.save();
  }
}
