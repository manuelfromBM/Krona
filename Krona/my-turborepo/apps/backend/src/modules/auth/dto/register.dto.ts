import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'El correo no es valido' })
  email!: string;

  @IsString()
  @MinLength(2, { message: 'El nombre es muy corto' })
  name!: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;
}
