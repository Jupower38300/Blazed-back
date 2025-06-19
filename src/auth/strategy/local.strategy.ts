import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<Profile> {
    const profile = await this.authService.validateUser(email, password);
    if (!profile) {
      throw new UnauthorizedException();
    }
    return profile;
  }
}
