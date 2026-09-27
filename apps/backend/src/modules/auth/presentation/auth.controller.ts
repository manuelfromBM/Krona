import { Body, Controller, Logger, Post } from '@nestjs/common';
import { RegisterUseCase } from '../application/register.usecase';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post('registro')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.registerUseCase.execute(dto);
    } catch (err) {
      this.logger.error(
        `Error en POST /auth/registro (${dto?.email}): ${(err as Error).message}`,
      );
      throw err;
    }
  }
}
