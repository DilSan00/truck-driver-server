import { ApiProperty } from '@nestjs/swagger';

export class WorkshopResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  tons: number;
}
