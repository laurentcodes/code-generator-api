import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

// services
import { CodeService } from 'src/code/code.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GeneratorService {
  constructor(
    private readonly codeService: CodeService,
    private readonly userService: UserService,
  ) {}

  async randomCode(digits?: number): Promise<number> {
    const code = Math.floor(Math.random() * Math.pow(10, digits || 6));

    return code;
  }

  async checkCodeExpiry(code: any): Promise<boolean> {
    const expired = code.expiresAt < new Date();

    if (expired) {
      // expired code, update status to EXPIRED
      await this.codeService.update({ ...code, status: 'EXPIRED' });
    }

    return expired;
  }

  async generateCode(account: string): Promise<any> {
    const randomCode = await this.randomCode();

    const code = await this.codeService.create({
      userAccount: account,
      id: undefined,
      code: randomCode,
      createdAt: undefined,
      expiresAt: new Date(Date.now() + 1000 * 60),
      status: 'PENDING',
    });

    return code;
  }

  async getCode(userId: string): Promise<any> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const codes = await this.codeService.findMany({
      userAccount: user.account,
    });

    const code = codes[0];

    if (code) {
      const expired = await this.checkCodeExpiry(code);
      // check code expiry
      if (expired || code.status === 'USED') {
        // if expired code, generate a new one
        return this.generateCode(user.account);
      }

      return code;
    }

    return this.generateCode(user.account);
  }

  async verifyCode(userId: string, code: number): Promise<any> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const codes = await this.codeService.findMany({
      userAccount: user.account,
      code,
    });

    if (codes.length === 0) {
      throw new NotFoundException('Code not found');
    }

    const currentCode = codes[0];

    if (currentCode.status === 'USED') {
      throw new BadRequestException('Code already used');
    }

    const expired = await this.checkCodeExpiry(currentCode);

    if (currentCode.status === 'EXPIRED' || expired) {
      throw new BadRequestException('Code expired');
    }

    await this.codeService.update({
      ...currentCode,
      status: 'USED',
    });

    return 'Code Verified Successfully';
  }
}
