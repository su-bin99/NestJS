import { Injectable, PipeTransform, HttpException } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) {
      throw new HttpException('value > 0', 400);
    }
    return value;
    //이 함수의 결과값이 pipe의 결과값
  }
}
