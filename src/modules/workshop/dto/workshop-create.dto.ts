import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class WorkshopCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @IsString({ message: 'Поле должна быть строкой' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Поле должно быть числом' })
  tons: number;
}
