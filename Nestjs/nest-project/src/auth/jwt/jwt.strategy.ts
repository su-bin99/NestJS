import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //인증할 때 사용
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //헤더의 토큰으로부터 추출
      secretOrKey: 'secret',
      ignoreExpiration: false, //백엔드에서 프론트로 jwt를 넘겨줄때 그 만료기간을 지정하는 것
    });
  }

  // 프론트에서 jwt가 날아왔을때,
  // payload를 뽑아 유효성 검사
  //   async validate(payload) {}
}
