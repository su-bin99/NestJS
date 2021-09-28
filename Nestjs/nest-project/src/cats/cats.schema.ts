import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Comments } from 'src/comments/comments.schema';

const options: SchemaOptions = {
  collection: 'cats',
  timestamps: true, //디비에서 하나가 만들어질 때 시간이 찍히도록
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'subin@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'subin',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'abc123!',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };

  readonly comments: Comments[];
}

export const _CatSchema = SchemaFactory.createForClass(Cat); //Cat클래스를 스키마로 바꿈

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  //클라에 보여줄 데이터만 virtual로 필터링해서 나감
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

// populate를 사용함
// 다른 도큐먼트랑 이어줄 수 있는 메소드
_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});

//populate를 사용하기 위한 옵션
_CatSchema.set('toObject', { virtuals: true }); //object로 변환가능하다는 옵션
_CatSchema.set('toJSON', { virtuals: true }); //json으로 변환가능하다는 옵션

export const CatSchema = _CatSchema;
