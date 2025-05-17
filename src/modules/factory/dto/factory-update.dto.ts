import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FactoryUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Поле должна быть строкой' })
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Поле должно быть числом' })
  tons?: number;
}
