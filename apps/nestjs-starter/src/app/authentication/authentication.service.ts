import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserService } from '../user/user.service';
import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private readonly redisService: RedisService,
    private jwtService: JwtService
  ) {}

  async login(username: string, pass: string): Promise<{ token: string }> {
    try {
      const user = this.usersService.getUserByUsername(username);
      if (user && this.comparePassword(pass, user.password)) {
        const { password, ...userWithoutPassword } = user;
        const token = this.jwtService.sign(userWithoutPassword, {
          expiresIn: '60s',
        });

        await this.redisService.set(token, user, 120);

        return { token };
      }

      throw new UnauthorizedException();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  async logout(token: string): Promise<boolean> {
    try {
      const result = await this.redisService.delete(token);
      return result === 1;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getUserByTokenAndVerify(jwt: string): Promise<User> {
    try {
      return (
        (await this.jwtService.verify(jwt)) &&
        (await this.redisService.get<User>(jwt))
      );
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  comparePassword(password1: string, hashedPassword: string): boolean {
    return compareSync(password1, hashedPassword);
  }
}
