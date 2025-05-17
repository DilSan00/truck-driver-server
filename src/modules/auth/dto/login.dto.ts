import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Электронная почта обязательна.' })
  @IsEmail({}, { message: 'Адрес электронной почты должен быть действительным.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Пароль обязателен.' })
  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов.' })
  password: string;
}
