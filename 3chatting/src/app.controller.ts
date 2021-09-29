import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index') // index.hbs 파일을 찾아서 렌더링
  root() {
    //가장 처음에 들어오는 뷰를 렌더링 하기 때문에 root로 명명
    return {
      data: {
        title: 'Chattings',
        copyright: 'subin',
      },
    };
  }
}
