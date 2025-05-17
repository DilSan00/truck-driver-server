import { ApiProperty } from '@nestjs/swagger';

export class FactoryResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  tons: number;
}
