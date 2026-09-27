import {
  Injectable,
  Inject,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '../dto/register.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../domain/repositories/user.repository';

@Injectable()
export class RegisterUseCase {
  private readonly logger = new Logger(RegisterUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async execute(dto: RegisterDto) {
    const existe = await this.users.findByEmail(dto.email);
    if (existe) {
      this.logger.warn(`Registro rechazado: correo ya existe (${dto.email})`);
      throw new ConflictException('El correo ya está registrado');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    let user;
    try {
      user = await this.users.create({
        email: dto.email,
        name: dto.name,
        passwordHash,
        role: 'CLIENT',
      });
    } catch (err) {
      this.logger.error(
        `Fallo al crear usuario (${dto.email}): ${(err as Error).message}`,
        (err as Error).stack,
      );
      throw err;
    }

    const access_token = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      access_token,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}
