import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  collection: 'comments',
  timestamps: true, //디비에서 하나가 만들어질 때 시간이 찍히도록
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats', //어떤 document랑 연결할지
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 컨텐츠',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({
    default: 0,
    required: true,
  })
  @IsNotEmpty()
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: '작성 대상 (게시물, 정보글)',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats', //어떤 document랑 연결할지
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments); //Cat클래스를 스키마로 바꿈
