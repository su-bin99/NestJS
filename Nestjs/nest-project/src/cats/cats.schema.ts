import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
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

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat); //Cat클래스를 스키마로 바꿈

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  //클라에 보여줄 데이터만 virtual로 필터링해서 나감
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
