import { ApiProperty } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto {
  @ApiProperty({
    example: '321321321',
    description: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'subin@naver.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'subin',
    description: 'name',
  })
  name: string;
}
