import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    //forRoutes('cats') : cats 라우터에 바인딩
    //forRoutes('*') : 전체 엔드포인트에 대해서 앞에서 이 미들웨어가 실행됨
  }
}
