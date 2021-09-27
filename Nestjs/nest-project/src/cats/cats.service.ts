import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  hiCatsService() {
    return 'hello cat';
  }
}
