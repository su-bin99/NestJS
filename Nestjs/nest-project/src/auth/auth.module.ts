import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { CatsRepository } from 'src/cats/cats.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }), //인증에 대한 설정
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }),
    CatsRepository,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
