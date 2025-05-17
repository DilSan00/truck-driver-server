import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class WorkshopUpdateDto {
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
