import { User } from '../entities/user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: {
    email: string;
    name: string;
    passwordHash: string;
    role: 'CLIENT' | 'PROVIDER';
  }): Promise<User>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
