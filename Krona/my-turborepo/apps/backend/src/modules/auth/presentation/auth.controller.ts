import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUseCase } from '../application/register.usecase';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}
  @Post('registro')
  register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }
}
