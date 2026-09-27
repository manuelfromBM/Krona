import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/backend/src/infrastructure/database/prisma.service';
import { User } from '../domain/entities/user.entity';
import { UserRepository } from '../domain/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    if (!row) return null;
    return new User(row.id, row.email, row.role, row.name, row.password);
  }

  async create(data: {
    email: string;
    name: string;
    passwordHash: string;
    role: 'CLIENT' | 'PROVIDER';
  }): Promise<User> {
    const row = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.passwordHash,
        role: data.role,
      },
    });
    return new User(row.id, row.email, row.name, row.role, row.password);
  }
}
