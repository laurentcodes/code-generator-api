import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

// services
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(account: string, password: string) {
    const user = await this.userService.findOne({ account });

    if (user) {
      throw new BadRequestException('Account already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await this.userService.create({
      account,
      password: hashedPassword,
      id: undefined,
    });

    newUser.password = undefined;

    return newUser;
  }

  async login(account: string, password: string) {
    const user = await this.userService.findOne({ account });

    if (!user) {
      throw new NotFoundException('Account not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new NotFoundException('Invalid password');
    }

    const payload = {
      id: user.id,
    };

    const token = this.jwtService.sign(payload);

    user.password = undefined;

    return {
      user,
      token,
    };
  }
}
