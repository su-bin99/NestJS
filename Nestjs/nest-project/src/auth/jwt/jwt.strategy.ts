import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //인증할 때 사용
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //헤더의 토큰으로부터 추출
      secretOrKey: 'secret',
      ignoreExpiration: false, //백엔드에서 프론트로 jwt를 넘겨줄때 그 만료기간을 지정하는 것
    });
  }

  // 프론트에서 jwt가 날아왔을때,
  // payload를 뽑아 유효성 검사
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );
    if (cat) return cat;
    // request.user안에 cat이 들어가게됨
    else throw new UnauthorizedException('접근 오류');
  }
}
