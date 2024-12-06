import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Code, Prisma } from '@prisma/client';

@Injectable()
export class CodeService {
  constructor(private prisma: PrismaService) {}

  async findMany(where: Prisma.CodeWhereInput): Promise<Code[]> {
    return this.prisma.code.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(code: Code): Promise<Code> {
    return this.prisma.code.create({
      data: code,
    });
  }

  async update(code: Code): Promise<Code> {
    return this.prisma.code.update({
      where: {
        id: code.id,
      },
      data: code,
    });
  }
}
