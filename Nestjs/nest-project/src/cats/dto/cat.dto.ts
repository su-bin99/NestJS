import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  // PickType을 통해 원하는 정보만 가져옴
  // 비밀번호를 가져오기 않기 위함
  // OmitType을 사용하면 원하지 않는 정보들을 뺄 수 있음
  @ApiProperty({
    example: '321321321',
    description: 'id',
  })
  id: string;
}
