import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  authorName: string;

  @Prop()
  title: string;

  @Prop()
  contents: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
